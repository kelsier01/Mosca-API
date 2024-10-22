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
exports.deleteAlerta = exports.updateAlerta = exports.createAlerta = exports.getAlertaById = exports.getAlertas = void 0;
const Alerta_1 = __importDefault(require("../models/Alerta"));
const getAlertas = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Alerta_1.default.findAll({ include: ['Funcionario', 'Deteccion'] });
});
exports.getAlertas = getAlertas;
const getAlertaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Alerta_1.default.findByPk(id, { include: ['Funcionario', 'Deteccion'] });
});
exports.getAlertaById = getAlertaById;
const createAlerta = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Alerta_1.default.create(data);
});
exports.createAlerta = createAlerta;
const updateAlerta = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Alerta_1.default.update(data, { where: { id } });
});
exports.updateAlerta = updateAlerta;
const deleteAlerta = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Alerta_1.default.destroy({ where: { id } });
});
exports.deleteAlerta = deleteAlerta;
