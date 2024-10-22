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
exports.deleteDeteccion = exports.updateDeteccion = exports.createDeteccion = exports.getDeteccionById = exports.getDetecciones = void 0;
const Deteccion_1 = __importDefault(require("../models/Deteccion"));
const getDetecciones = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Deteccion_1.default.findAll({ include: ['Trampa', 'Predio', 'EstadoDeteccion'] });
});
exports.getDetecciones = getDetecciones;
const getDeteccionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Deteccion_1.default.findByPk(id, { include: ['Trampa', 'Predio', 'EstadoDeteccion'] });
});
exports.getDeteccionById = getDeteccionById;
const createDeteccion = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Deteccion_1.default.create(data);
});
exports.createDeteccion = createDeteccion;
const updateDeteccion = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Deteccion_1.default.update(data, { where: { id } });
});
exports.updateDeteccion = updateDeteccion;
const deleteDeteccion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Deteccion_1.default.destroy({ where: { id } });
});
exports.deleteDeteccion = deleteDeteccion;
