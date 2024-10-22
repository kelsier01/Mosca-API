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
exports.deleteTrampa = exports.putTrampa = exports.postTrampa = exports.getTrampa = exports.getTrampas = void 0;
const Trampa_1 = __importDefault(require("../models/Trampa"));
const getTrampas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trampa = yield Trampa_1.default.findAll();
        res.json(trampa);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener trampa', error });
    }
});
exports.getTrampas = getTrampas;
const getTrampa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const trampa = yield Trampa_1.default.findByPk(id);
        if (trampa) {
            res.json(trampa);
        }
        else {
            res.status(404).json({ message: `trampa con ID ${id} no encontrada` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener trampa', error });
    }
});
exports.getTrampa = getTrampa;
const postTrampa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newtrampa = yield Trampa_1.default.create(body);
        res.json(newtrampa);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear trampa', error });
    }
});
exports.postTrampa = postTrampa;
const putTrampa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const trampa = yield Trampa_1.default.findByPk(id);
        if (!trampa) {
            return res.status(404).json({
                msg: "No existe la trampa"
            });
        }
        yield trampa.update(body);
        res.json(trampa);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesg: "Error al crear trampa"
        });
    }
});
exports.putTrampa = putTrampa;
const deleteTrampa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const trampa = yield Trampa_1.default.findByPk(id);
    if (!trampa) {
        return res.status(404).json({
            msg: `No existe una trampa con el id ${id}`,
        });
    }
    yield trampa.destroy();
    res.json(trampa);
});
exports.deleteTrampa = deleteTrampa;
