import { Router } from 'express';
import * as deteccionController from '../controllers/deteccionController';

const router = Router();

router.get('/', deteccionController.getDetecciones);
router.get('/:id', deteccionController.getDeteccion);
router.post('/', deteccionController.postDeteccion);
router.put('/:id', deteccionController.putDeteccion);
router.delete('/:id', deteccionController.deleteDeteccion);

export default router;