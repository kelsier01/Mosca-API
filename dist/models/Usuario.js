"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const Usuario = connection_1.default.define('usuarios', {
    email: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
// Usuario.prototype.toJSON = function () {
//   let values = Object.assign({}, this.get());
//   delete values.password;
//   return values;
// };
// Usuario.hasOne(Persona, { foreignKey: 'usuario_id' });
exports.default = Usuario;
