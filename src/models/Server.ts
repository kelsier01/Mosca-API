import express,  { Application } from "express";
import db from "../bd/connection";
import cors from "cors";
import bodyParser from "body-parser"; // Importa body-parser
import http from "http"; // Importa módulo http de Node.js
import { Server as SocketIOServer, Socket } from "socket.io"; // Importa Server y Socket de socket.io
import firebase_app from "../firebase/firebase.config";
import { getFirestore } from "firebase/firestore";

//Rutas
import alertaRutas from "../routes/alertaRoutes";
import authRutas from "../routes/authRoutes";
import deteccionRutas from "../routes/deteccionRoutes";
import funcionarioRutas from "../routes/funcionarioRoutes";
import personaRutas from "../routes/personaRoutes";
import predioRutas from "../routes/predioRoutes";
import trampaRutas from "../routes/trampaRoutes";
import usuarioRutas from "../routes/usuarioRoutes";
import funcionarioHasTrampaRutas from "../routes/funcionarioHasTrampaRoutes";
import duenioRutas from "../routes/duenioRoutes";

class Server {
    private static instance: Server;
    private app: Application;
    private server: http.Server;
    private io: SocketIOServer;
    private port: string;
    private firebase: typeof firebase_app;
    private apiPath = {
        alertas: "/api/alertas",
        login: "/api/auth",
        detecciones: "/api/detecciones",
        duenios: "/api/duenios",
        estados_deteccion: "/api/estados_deteccion",
        funcionarios: "/api/funcionarios",
        funcionarios_has_trampas: "/api/funcionarios_has_trampas",
        personas: "/api/personas",
        predios: "/api/predios",
        roles: "/api/roles",
        trampas: "/api/trampas",
        usuarios: "/api/usuarios"
    };

    constructor(){
        this.app = express();
        this.server = http.createServer(this.app); // Crea el servidor HTTP
        this.io = new  SocketIOServer(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        }); // Crea el servidor de WebSockets
        this.port = process.env.PORT || "8080";
        this.firebase = firebase_app; // Inicializa Firebase
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.bdConnection();
        this.middlewares();
        this.routes();
        this.configureSocketIO();
        this.initFirebase(); // Inicializa Firebase
    }

    // Método para inicializar Firebase
    private initFirebase(){
        try {
            // Inicializa los servicios que necesitas
            const firestore = getFirestore(this.firebase);

            console.log('Firebase Admin SDK inicializado correctamente');
            
            // Opcional: Verifica la conexión a Firestore
            console.log('Instancia de Firestore disponible:', !!firestore);
        } catch (error: any) {
            console.error('Error al inicializar Firebase:', error);
        }  
    }

    public getFirebase() {
        return this.firebase;
    }

    

    // Método estático para obtener la instancia única del servidor
    public static getInstance(): Server {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }

    async bdConnection() {
        try {
            await db.authenticate();
            console.log("Database Online");
        } catch (error:any) {
            throw new Error(error);
        }
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));

    }

    routes(){
        this.app.use(this.apiPath.login, authRutas);
        this.app.use(this.apiPath.alertas, alertaRutas);
        this.app.use(this.apiPath.detecciones, deteccionRutas);
        this.app.use(this.apiPath.funcionarios, funcionarioRutas);
        this.app.use(this.apiPath.personas, personaRutas);
        this.app.use(this.apiPath.predios, predioRutas);
        this.app.use(this.apiPath.trampas, trampaRutas);
        this.app.use(this.apiPath.usuarios, usuarioRutas);
        this.app.use(this.apiPath.funcionarios_has_trampas, funcionarioHasTrampaRutas);
        this.app.use(this.apiPath.duenios, duenioRutas);
    }

     // Configura socket.io
     configureSocketIO() {
        console.log("Configurando Socket.IO");

        this.io.on("connection", (socket: Socket) => {
            console.log("Nuevo cliente conectado:", socket.id);

            // Escuchar eventos personalizados
            socket.on("chat message", (msg: string) => {
                console.log("Mensaje recibido:", msg);
                // Emitir el mensaje a todos los clientes
                this.io.emit("chat message", msg);
            });

            // Manejar desconexión
            socket.on("disconnect", () => {
                console.log("Cliente desconectado:", socket.id);
            });
        });
    }

    // Método para notificar a todos los clientes
    notifyClients(event: string, data: any) {
        this.io.emit(event, data); // Emitir un evento a todos los clientes conectados
    }

    listen(){
        this.server.listen(this.port, ()=>{
            console.log(`Servidor Conectado al puerto = ${this.port}`);
        });
    }
}

export default Server;