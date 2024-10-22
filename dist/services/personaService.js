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
exports.deletePersona = exports.updatePersona = exports.createPersona = exports.getPersonaById = exports.getPersonas = void 0;
const Persona_1 = __importDefault(require("../models/Persona"));
const getPersonas = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Persona_1.default.findAll();
});
exports.getPersonas = getPersonas;
const getPersonaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Persona_1.default.findByPk(id);
});
exports.getPersonaById = getPersonaById;
const createPersona = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Persona_1.default.create(data);
});
exports.createPersona = createPersona;
const updatePersona = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Persona_1.default.update(data, { where: { id } });
});
exports.updatePersona = updatePersona;
const deletePersona = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Persona_1.default.destroy({ where: { id } });
});
exports.deletePersona = deletePersona;
