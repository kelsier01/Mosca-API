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
exports.deleteFuncionario = exports.putFuncionario = exports.postFuncionario = exports.getFuncionario = exports.getFuncionarios = void 0;
const Funcionario_1 = __importDefault(require("../models/Funcionario"));
const getFuncionarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const funcionario = yield Funcionario_1.default.findAll();
        res.json(funcionario);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener Funcionario', error });
    }
});
exports.getFuncionarios = getFuncionarios;
const getFuncionario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const funcionario = yield Funcionario_1.default.findByPk(id);
        if (funcionario) {
            res.json(funcionario);
        }
        else {
            res.status(404).json({ message: `funcionario con ID ${id} no encontrada` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener funcionario', error });
    }
});
exports.getFuncionario = getFuncionario;
const postFuncionario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newfuncionario = yield Funcionario_1.default.create(req.body);
        res.json(newfuncionario);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear funcionario', error });
    }
});
exports.postFuncionario = postFuncionario;
const putFuncionario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const funcionario = yield Funcionario_1.default.findByPk(id);
        if (!funcionario) {
            return res.status(404).json({
                msg: "No existe la funcionario"
            });
        }
        yield funcionario.update(body);
        res.json(funcionario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesg: "Error al crear funcionario"
        });
    }
});
exports.putFuncionario = putFuncionario;
const deleteFuncionario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const funcionario = yield Funcionario_1.default.findByPk(id);
    if (!funcionario) {
        return res.status(404).json({
            msg: `No existe un servicio con el id ${id}`,
        });
    }
    yield funcionario.destroy();
    res.json(funcionario);
});
exports.deleteFuncionario = deleteFuncionario;
