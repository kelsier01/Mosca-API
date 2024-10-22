"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFuncionario = exports.updateFuncionario = exports.createFuncionario = exports.getFuncionarioById = exports.getFuncionarios = void 0;
const Funcionario_1 = __importDefault(require("../models/Funcionario"));
const getFuncionarios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Funcionario_1.default.findAll({ include: ['Persona', 'Rol'] });
});
exports.getFuncionarios = getFuncionarios;
const getFuncionarioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Funcionario_1.default.findByPk(id, { include: ['Persona', 'Rol'] });
});
exports.getFuncionarioById = getFuncionarioById;
const createFuncionario = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Funcionario_1.default.create(data);
});
exports.createFuncionario = createFuncionario;
const updateFuncionario = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Funcionario_1.default.update(data, { where: { id } });
});
exports.updateFuncionario = updateFuncionario;
const deleteFuncionario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Funcionario_1.default.destroy({ where: { id } });
});
exports.deleteFuncionario = deleteFuncionario;
