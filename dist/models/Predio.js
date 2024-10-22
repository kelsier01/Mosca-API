"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Duenio_1 = __importDefault(require("./Duenio"));
const connection_1 = __importDefault(require("../bd/connection"));
const Predio = connection_1.default.define('predios', {
    duenio_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
Predio.belongsTo(Duenio_1.default, { foreignKey: 'duenio_id' });
// Predio.hasMany(Trampa, { foreignKey: 'predio_id' });
exports.default = Predio;
