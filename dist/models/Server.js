"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../bd/connection"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser")); // Importa body-parser
//Rutas
const alertaRoutes_1 = __importDefault(require("../routes/alertaRoutes"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const deteccionRoutes_1 = __importDefault(require("../routes/deteccionRoutes"));
const funcionarioRoutes_1 = __importDefault(require("../routes/funcionarioRoutes"));
const personaRoutes_1 = __importDefault(require("../routes/personaRoutes"));
const predioRoutes_1 = __importDefault(require("../routes/predioRoutes"));
const trampaRoutes_1 = __importDefault(require("../routes/trampaRoutes"));
const usuarioRoutes_1 = __importDefault(require("../routes/usuarioRoutes"));
class Server {
    constructor() {
        this.apiPath = {
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
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8888";
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        this.bdConnection();
        this.middlewares();
        this.routes();
    }
    bdConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Database Online");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPath.login, authRoutes_1.default);
        this.app.use(this.apiPath.alertas, alertaRoutes_1.default);
        this.app.use(this.apiPath.detecciones, deteccionRoutes_1.default);
        this.app.use(this.apiPath.funcionarios, funcionarioRoutes_1.default);
        this.app.use(this.apiPath.personas, personaRoutes_1.default);
        this.app.use(this.apiPath.predios, predioRoutes_1.default);
        this.app.use(this.apiPath.trampas, trampaRoutes_1.default);
        this.app.use(this.apiPath.usuarios, usuarioRoutes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Conectado al puerto = ${this.port}`);
        });
    }
}
exports.default = Server;
