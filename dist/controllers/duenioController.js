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
exports.deleteDuenio = exports.putDuenio = exports.postDuenio = exports.getDuenio = exports.getDuenios = void 0;
const Duenio_1 = __importDefault(require("../models/Duenio"));
const Persona_1 = __importDefault(require("../models/Persona"));
const getDuenios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const duenios = yield Duenio_1.default.findAll({
            include: [{
                    model: Persona_1.default,
                    as: 'persona'
                }]
        });
        res.json(duenios);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener dueños', error });
    }
});
exports.getDuenios = getDuenios;
const getDuenio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const duenio = yield Duenio_1.default.findByPk(id, {
            include: [{
                    model: Persona_1.default,
                    as: 'persona'
                }]
        });
        if (duenio) {
            res.json(duenio);
        }
        else {
            res.status(404).json({ message: `Dueño con ID ${id} no encontrado` });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener dueño', error });
    }
});
exports.getDuenio = getDuenio;
const postDuenio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newDuenio = yield Duenio_1.default.create(body);
        // Buscar el dueño recién creado con sus datos de persona
        const duenioConPersona = yield Duenio_1.default.findByPk(newDuenio.getDataValue('id'), {
            include: [{
                    model: Persona_1.default,
                    as: 'persona'
                }]
        });
        res.json(duenioConPersona);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear dueño', error });
    }
});
exports.postDuenio = postDuenio;
const putDuenio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const duenio = yield Duenio_1.default.findByPk(id);
        if (!duenio) {
            return res.status(404).json({
                msg: "No existe el dueño"
            });
        }
        yield duenio.update(body);
        // Obtener el dueño actualizado con sus datos de persona
        const duenioActualizado = yield Duenio_1.default.findByPk(id, {
            include: [{
                    model: Persona_1.default,
                    as: 'persona'
                }]
        });
        res.json(duenioActualizado);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar dueño"
        });
    }
});
exports.putDuenio = putDuenio;
const deleteDuenio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const duenio = yield Duenio_1.default.findByPk(id);
        if (!duenio) {
            return res.status(404).json({
                msg: `No existe un dueño con el id ${id}`
            });
        }
        // En lugar de eliminar el registro físicamente, actualizamos el estado a 0 (inactivo)
        yield duenio.update({ estado: 0 });
        res.json({ msg: 'Dueño desactivado correctamente' });
        // Si prefieres eliminar físicamente el registro, descomenta esta línea y comenta la anterior
        // await duenio.destroy();
        // res.json({ msg: 'Dueño eliminado correctamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al eliminar dueño"
        });
    }
});
exports.deleteDuenio = deleteDuenio;
