import { Router } from 'express';
import * as funcionarioController from '../controllers/funcionarioController';

const router = Router();

router.get('/', funcionarioController.getFuncionarios);
router.get('/:id', funcionarioController.getFuncionario);
router.post('/', funcionarioController.postFuncionario);
router.put('/:id', funcionarioController.putFuncionario);
router.delete('/:id', funcionarioController.deleteFuncionario);

export default router;