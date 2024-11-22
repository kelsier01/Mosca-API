import { Router } from 'express';
import * as funcionarioHasTrampaController from '../controllers/funcionarioHasTrampaController';

const router = Router();

router.get('/', funcionarioHasTrampaController.getFuncionarioHasTrampas);
router.get('/:id', funcionarioHasTrampaController.getFuncionarioHasTrampa);
router.post('/', funcionarioHasTrampaController.postFuncionarioHasTrampa);
router.put('/:id', funcionarioHasTrampaController.putFuncionarioHasTrampa);
router.delete('/:id', funcionarioHasTrampaController.deleteFuncionarioHasTrampa);

export default router;