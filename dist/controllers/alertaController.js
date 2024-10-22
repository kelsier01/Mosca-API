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
exports.deleteAlerta = exports.putAlerta = exports.postAlerta = exports.getAlerta = exports.getAlertas = void 0;
const Alerta_1 = __importDefault(require("../models/Alerta"));
const getAlertas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alertas = yield Alerta_1.default.findAll();
        res.json(alertas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener alertas', error });
    }
});
exports.getAlertas = getAlertas;
const getAlerta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const alerta = yield Alerta_1.default.findByPk(id);
        if (alerta) {
            res.json(alerta);
        }
        else {
            res.status(404).json({ message: `Alerta con ID ${id} no encontrada` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener alerta', error });
    }
});
exports.getAlerta = getAlerta;
const postAlerta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newAlerta = yield Alerta_1.default.create(req.body);
        res.json(newAlerta);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear alerta', error });
    }
});
exports.postAlerta = postAlerta;
const putAlerta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const alerta = yield Alerta_1.default.findByPk(id);
        if (!alerta) {
            return res.status(404).json({
                msg: "No existe la alerta"
            });
        }
        yield alerta.update(body);
        res.json(alerta);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesg: "Error al crear alerta"
        });
    }
});
exports.putAlerta = putAlerta;
const deleteAlerta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const alerta = yield Alerta_1.default.findByPk(id);
    if (!alerta) {
        return res.status(404).json({
            msg: `No existe un servicio con el id ${id}`,
        });
    }
    yield alerta.destroy();
    res.json(alerta);
});
exports.deleteAlerta = deleteAlerta;
