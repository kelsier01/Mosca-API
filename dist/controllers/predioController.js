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
exports.deletePredio = exports.putPredio = exports.postPredio = exports.getPredio = exports.getPredios = void 0;
const Predio_1 = __importDefault(require("../models/Predio"));
const Duenio_1 = __importDefault(require("../models/Duenio"));
const Persona_1 = __importDefault(require("../models/Persona"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const getPredios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const predios = yield Predio_1.default.findAll({
            include: [{
                    model: Duenio_1.default,
                    as: 'duenio',
                    include: [
                        {
                            model: Persona_1.default,
                            as: 'persona',
                            include: [
                                {
                                    model: Usuario_1.default,
                                    as: 'usuario',
                                }
                            ],
                        },
                    ],
                }],
        });
        res.json(predios);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener personas', error });
    }
});
exports.getPredios = getPredios;
const getPredio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const predio = yield Predio_1.default.findByPk(id);
        if (predio) {
            res.json(predio);
        }
        else {
            res.status(404).json({ message: `predio con ID ${id} no encontrada` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener predio', error });
    }
});
exports.getPredio = getPredio;
const postPredio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { duenio_id, direccion, estado } = req.body;
    try {
        const newpredio = yield Predio_1.default.create({
            duenio_id,
            direccion,
            estado
        });
        res.json(newpredio);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear nuevo pedido', error });
    }
});
exports.postPredio = postPredio;
const putPredio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const predio = yield Predio_1.default.findByPk(id);
        if (!predio) {
            return res.status(404).json({
                msg: "No existe la predio"
            });
        }
        yield predio.update(body);
        res.json(predio);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesg: "Error al crear predio"
        });
    }
});
exports.putPredio = putPredio;
const deletePredio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const predio = yield Predio_1.default.findByPk(id);
    if (!predio) {
        return res.status(404).json({
            msg: `No existe una predio con el id ${id}`,
        });
    }
    yield predio.destroy();
    res.json(predio);
});
exports.deletePredio = deletePredio;
