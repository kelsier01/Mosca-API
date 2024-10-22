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
exports.deletePersona = exports.putPersona = exports.postPersona = exports.getPersona = exports.getPersonas = void 0;
const Persona_1 = __importDefault(require("../models/Persona"));
const getPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personas = yield Persona_1.default.findAll();
        res.json(personas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener personas', error });
    }
});
exports.getPersonas = getPersonas;
const getPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const persona = yield Persona_1.default.findByPk(id);
        if (persona) {
            res.json(persona);
        }
        else {
            res.status(404).json({ message: `Persona con ID ${id} no encontrada` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener persona', error });
    }
});
exports.getPersona = getPersona;
const postPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newpersona = yield Persona_1.default.create(body);
        res.json(newpersona);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear persona', error });
    }
});
exports.postPersona = postPersona;
const putPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const persona = yield Persona_1.default.findByPk(id);
        if (!persona) {
            return res.status(404).json({
                msg: "No existe la persona"
            });
        }
        yield persona.update(body);
        res.json(persona);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            mesg: "Error al crear persona"
        });
    }
});
exports.putPersona = putPersona;
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const persona = yield Persona_1.default.findByPk(id);
    if (!persona) {
        return res.status(404).json({
            msg: `No existe una persona con el id ${id}`,
        });
    }
    yield persona.destroy();
    res.json(persona);
});
exports.deletePersona = deletePersona;
