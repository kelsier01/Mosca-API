"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const Funcionario_1 = __importDefault(require("./Funcionario"));
const Deteccion_1 = __importDefault(require("./Deteccion"));
const Alerta = connection_1.default.define('alertas', {
    funcionario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    deteccion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
Alerta.belongsTo(Funcionario_1.default, { foreignKey: 'funcionario_id' });
Alerta.belongsTo(Deteccion_1.default, { foreignKey: 'deteccion_id' });
exports.default = Alerta;
