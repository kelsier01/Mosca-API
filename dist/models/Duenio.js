"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Persona_1 = __importDefault(require("./Persona"));
const connection_1 = __importDefault(require("../bd/connection"));
const Duenio = connection_1.default.define('duenios', {
    persona_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
Duenio.belongsTo(Persona_1.default, { foreignKey: 'persona_id' });
// Duenio.hasMany(Predio, { foreignKey: 'duenio_id' });
exports.default = Duenio;
