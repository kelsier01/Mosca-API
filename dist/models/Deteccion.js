"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const Trampa_1 = __importDefault(require("./Trampa"));
const Predio_1 = __importDefault(require("./Predio"));
const EstadoDeteccion_1 = __importDefault(require("./EstadoDeteccion"));
const Deteccion = connection_1.default.define('detecciones', {
    trampa_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING(300000),
        allowNull: false,
    },
    predio_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado_deteccion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        unique: true,
    },
});
Deteccion.belongsTo(Trampa_1.default, { foreignKey: 'trampa_id' });
Deteccion.belongsTo(Predio_1.default, { foreignKey: 'predio_id' });
Deteccion.belongsTo(EstadoDeteccion_1.default, { foreignKey: 'estado_deteccion_id' });
// Deteccion.hasMany(Alerta, { foreignKey: 'deteccion_id' });
exports.default = Deteccion;
