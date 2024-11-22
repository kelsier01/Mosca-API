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
exports.deleteFuncionarioHasTrampa = exports.putFuncionarioHasTrampa = exports.postFuncionarioHasTrampa = exports.getFuncionarioHasTrampa = exports.getFuncionarioHasTrampas = void 0;
const FuncionarioHasTrampa_1 = __importDefault(require("../models/FuncionarioHasTrampa"));
const Funcionario_1 = __importDefault(require("../models/Funcionario"));
const Trampa_1 = __importDefault(require("../models/Trampa"));
const Rol_1 = __importDefault(require("../models/Rol"));
// Obtener todos los FuncionarioHasTrampa
const getFuncionarioHasTrampas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const funcionarioHasTrampas = yield FuncionarioHasTrampa_1.default.findAll({
            include: [
                {
                    model: Funcionario_1.default,
                    as: 'funcionario',
                },
                {
                    model: Trampa_1.default,
                    as: 'trampa',
                },
                {
                    model: Rol_1.default,
                    as: 'rol',
                }
            ],
        });
        res.json(funcionarioHasTrampas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener FuncionarioHasTrampas', error });
    }
});
exports.getFuncionarioHasTrampas = getFuncionarioHasTrampas;
// Obtener un FuncionarioHasTrampa por ID
const getFuncionarioHasTrampa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const funcionarioHasTrampa = yield FuncionarioHasTrampa_1.default.findByPk(id, {
            include: [
                {
                    model: Funcionario_1.default,
                    as: 'funcionario',
                },
                {
                    model: Trampa_1.default,
                    as: 'trampa',
                },
                {
                    model: Rol_1.default,
                    as: 'rol',
                }
            ],
        });
        if (funcionarioHasTrampa) {
            res.json(funcionarioHasTrampa);
        }
        else {
            res.status(404).json({ message: `FuncionarioHasTrampa con ID ${id} no encontrado` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener FuncionarioHasTrampa', error });
    }
});
exports.getFuncionarioHasTrampa = getFuncionarioHasTrampa;
// Crear un FuncionarioHasTrampa
const postFuncionarioHasTrampa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { funcionario_id, trampa_id, rol_id } = req.body;
    try {
        // Crear FuncionarioHasTrampa
        const newFuncionarioHasTrampa = yield FuncionarioHasTrampa_1.default.create({ funcionario_id, trampa_id, rol_id });
        res.json(newFuncionarioHasTrampa);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear FuncionarioHasTrampa', error });
    }
});
exports.postFuncionarioHasTrampa = postFuncionarioHasTrampa;
// Actualizar un FuncionarioHasTrampa
const putFuncionarioHasTrampa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const funcionarioHasTrampa = yield FuncionarioHasTrampa_1.default.findByPk(id);
        if (!funcionarioHasTrampa) {
            return res.status(404).json({ msg: "No existe el FuncionarioHasTrampa" });
        }
        yield funcionarioHasTrampa.update(body);
        res.json(funcionarioHasTrampa);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar FuncionarioHasTrampa" });
    }
});
exports.putFuncionarioHasTrampa = putFuncionarioHasTrampa;
// Eliminar un FuncionarioHasTrampa
const deleteFuncionarioHasTrampa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const funcionarioHasTrampa = yield FuncionarioHasTrampa_1.default.findByPk(id);
        if (!funcionarioHasTrampa) {
            return res.status(404).json({ msg: `No existe un FuncionarioHasTrampa con el id ${id}` });
        }
        yield funcionarioHasTrampa.destroy();
        res.json(funcionarioHasTrampa);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar FuncionarioHasTrampa', error });
    }
});
exports.deleteFuncionarioHasTrampa = deleteFuncionarioHasTrampa;
