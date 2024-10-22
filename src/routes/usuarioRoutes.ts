import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';

const router = Router();
router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuario);
router.post('/', usuarioController.postUsuario);
router.put('/:id', usuarioController.putUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

export default router;