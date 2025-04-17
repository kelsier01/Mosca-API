"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const duenioController_1 = require("../controllers/duenioController");
const router = (0, express_1.Router)();
// Rutas básicas CRUD
router.get('/', duenioController_1.getDuenios);
router.get('/:id', duenioController_1.getDuenio);
router.post('/', duenioController_1.postDuenio);
router.put('/:id', duenioController_1.putDuenio);
router.delete('/:id', duenioController_1.deleteDuenio);
exports.default = router;
