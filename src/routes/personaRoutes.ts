import { Router } from 'express';
import * as personaController from '../controllers/personaController';

const router = Router();

router.get('/', personaController.getPersonas);
router.get('/:id', personaController.getPersona);
router.post('/', personaController.postPersona);
router.put('/:id', personaController.putPersona);
router.delete('/:id', personaController.deletePersona);

export default router;