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
exports.deleteDeteccion = exports.putDeteccion = exports.postDeteccion = exports.getDeteccion = exports.getDetecciones = void 0;
const Deteccion_1 = __importDefault(require("../models/Deteccion"));
const Alerta_1 = __importDefault(require("../models/Alerta"));
const FuncionarioHasTrampa_1 = __importDefault(require("../models/FuncionarioHasTrampa"));
const getDetecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detecciones = yield Deteccion_1.default.findAll();
        res.json({ detecciones });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener detecciones', error });
    }
});
exports.getDetecciones = getDetecciones;
const getDeteccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deteccion = yield Deteccion_1.default.findByPk(id);
        if (deteccion) {
            res.json(deteccion);
        }
        else {
            res.status(404).json({ message: `Deteccion con ID ${id} no encontrada` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener Deteccion', error });
    }
});
exports.getDeteccion = getDeteccion;
const postDeteccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trampa_id } = req.body;
    const funcionarios_has_trampas = yield FuncionarioHasTrampa_1.default.findAll({
        where: { trampa_id }
    });
    try {
        const newDeteccion = yield Deteccion_1.default.create(req.body);
        const alerta = funcionarios_has_trampas.forEach((funcionario_has_trampa) => {
            Alerta_1.default.create({
                funcionario_id: funcionario_has_trampa.getDataValue('funcionario_id'),
                deteccion_id: newDeteccion.getDataValue('id'),
            });
        });
        res.json({ newDeteccion, alerta });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear Deteccion', error });
    }
});
exports.postDeteccion = postDeteccion;
const putDeteccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const deteccion = yield Deteccion_1.default.findByPk(id);
        if (!deteccion) {
            return res.status(404).json({
                msg: "No existe la Deteccion"
            });
        }
        yield deteccion.update(body);
        res.json(deteccion);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesg: "Error al crear Deteccion"
        });
    }
});
exports.putDeteccion = putDeteccion;
const deleteDeteccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deteccion = yield Deteccion_1.default.findByPk(id);
    if (!deteccion) {
        return res.status(404).json({
            msg: `No existe una deteccion con el id ${id}`,
        });
    }
    yield deteccion.destroy();
    res.json(Deteccion_1.default);
});
exports.deleteDeteccion = deleteDeteccion;
