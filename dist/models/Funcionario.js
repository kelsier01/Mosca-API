"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Persona_1 = __importDefault(require("./Persona"));
const Rol_1 = __importDefault(require("./Rol"));
const connection_1 = __importDefault(require("../bd/connection"));
const Funcionario = connection_1.default.define('funcionarios', {
    persona_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    rol_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
Funcionario.belongsTo(Persona_1.default, { foreignKey: 'persona_id' });
Funcionario.belongsTo(Rol_1.default, { foreignKey: 'rol_id' });
// Funcionario.hasMany(Alerta, { foreignKey: 'funcionario_id' });
// Funcionario.hasMany(FuncionarioHasTrampa, { foreignKey: 'funcionario_id' });
exports.default = Funcionario;
