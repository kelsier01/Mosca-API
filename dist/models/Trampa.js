"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Predio_1 = __importDefault(require("./Predio"));
const connection_1 = __importDefault(require("../bd/connection"));
const Usuario_1 = __importDefault(require("./Usuario"));
const Trampa = connection_1.default.define('trampas', {
    predio_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    direccion_mac: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    modelo: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    coordenadas: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
Trampa.belongsTo(Predio_1.default, { foreignKey: 'predio_id' });
Trampa.belongsTo(Usuario_1.default, { foreignKey: 'usuario_id' });
// Trampa.hasMany(Deteccion, { foreignKey: 'trampa_id' });
// Trampa.hasMany(FuncionarioHasTrampa, { foreignKey: 'trampa_id' });
exports.default = Trampa;
