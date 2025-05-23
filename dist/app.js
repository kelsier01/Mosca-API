"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Server_1 = __importDefault(require("./models/Server"));
//Obtenemos la instancia del servidor
const server = Server_1.default.getInstance();
server.listen();
