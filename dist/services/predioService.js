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
exports.deletePredio = exports.updatePredio = exports.createPredio = exports.getPredioById = exports.getPredios = void 0;
const Predio_1 = __importDefault(require("../models/Predio"));
const getPredios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Predio_1.default.findAll({ include: ['Dueno'] });
});
exports.getPredios = getPredios;
const getPredioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Predio_1.default.findByPk(id, { include: ['Dueno'] });
});
exports.getPredioById = getPredioById;
const createPredio = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Predio_1.default.create(data);
});
exports.createPredio = createPredio;
const updatePredio = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Predio_1.default.update(data, { where: { id } });
});
exports.updatePredio = updatePredio;
const deletePredio = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Predio_1.default.destroy({ where: { id } });
});
exports.deletePredio = deletePredio;