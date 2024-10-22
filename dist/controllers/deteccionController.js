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
    const { body } = req;
    try {
        const newDeteccion = yield Deteccion_1.default.create(req.body);
        res.json(newDeteccion);
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
