import express,  { Application } from "express";
import db from "../bd/connection";
import cors from "cors";
import bodyParser from "body-parser"; // Importa body-parser

//Rutas
import alertaRutas from "../routes/alertaRoutes";
import authRutas from "../routes/authRoutes";
import deteccionRutas from "../routes/deteccionRoutes";
import funcionarioRutas from "../routes/funcionarioRoutes";
import personaRutas from "../routes/personaRoutes";
import predioRutas from "../routes/predioRoutes";
import trampaRutas from "../routes/trampaRoutes";
import usuarioRutas from "../routes/usuarioRoutes";


class Server {
    private app: Application;
    private port: string;
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
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8888";
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.bdConnection();
        this.middlewares();
        this.routes();
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
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor Conectado al puerto = ${this.port}`);
        });
    }
}

export default Server;