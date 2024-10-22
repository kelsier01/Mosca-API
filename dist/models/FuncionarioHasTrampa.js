"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const Funcionario_1 = __importDefault(require("./Funcionario"));
const Trampa_1 = __importDefault(require("./Trampa"));
const Rol_1 = __importDefault(require("./Rol"));
const FuncionarioHasTrampa = connection_1.default.define('funcionarios_has_trampas', {
    funcionario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    trampa_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    rol_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
FuncionarioHasTrampa.belongsTo(Funcionario_1.default, { foreignKey: 'funcionario_id' });
FuncionarioHasTrampa.belongsTo(Trampa_1.default, { foreignKey: 'trampa_id' });
FuncionarioHasTrampa.belongsTo(Rol_1.default, { foreignKey: 'rol_id' });
exports.default = FuncionarioHasTrampa;
