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
exports.deleteTrampa = exports.updateTrampa = exports.createTrampa = exports.getTrampaById = exports.getTrampas = void 0;
const Trampa_1 = __importDefault(require("../models/Trampa"));
const getTrampas = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Trampa_1.default.findAll({ include: ['Predio'] });
});
exports.getTrampas = getTrampas;
const getTrampaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Trampa_1.default.findByPk(id, { include: ['Predio'] });
});
exports.getTrampaById = getTrampaById;
const createTrampa = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Trampa_1.default.create(data);
});
exports.createTrampa = createTrampa;
const updateTrampa = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Trampa_1.default.update(data, { where: { id } });
});
exports.updateTrampa = updateTrampa;
const deleteTrampa = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Trampa_1.default.destroy({ where: { id } });
});
exports.deleteTrampa = deleteTrampa;
