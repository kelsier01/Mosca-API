"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const EstadoDeteccion = connection_1.default.define('estados_detecciones', {
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
});
// EstadoDeteccion.hasOne(Deteccion, { foreignKey: 'estado_deteccion_id' });
exports.default = EstadoDeteccion;
