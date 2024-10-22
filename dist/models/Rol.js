"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const Rol = connection_1.default.define('roles', {
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
// Rol.hasOne(Funcionario, { foreignKey: 'rol_id' });
// Rol.hasOne(FuncionarioHasTrampa, { foreignKey: 'rol_id' });
exports.default = Rol;
