"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Usuario_1 = __importDefault(require("./Usuario"));
const connection_1 = __importDefault(require("../bd/connection"));
const Persona = connection_1.default.define('personas', {
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    rut: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
Persona.belongsTo(Usuario_1.default, { foreignKey: 'usuario_id', as: 'usuario' });
// Persona.hasOne(Duenio, { foreignKey: 'persona_id' });
// Persona.hasOne(Funcionario, { foreignKey: 'persona_id' });
exports.default = Persona;
