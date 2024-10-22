"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const connection_1 = __importDefault(require("./bd/connection"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Usar las rutas
app.use('/api', routes_1.default);
// Sincronizar los modelos con la base de datos
connection_1.default.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
});
app.listen(port, () => {
    console.log(`⚡️[servidor]: Servidor corriendo en http://localhost:${port}`);
});
