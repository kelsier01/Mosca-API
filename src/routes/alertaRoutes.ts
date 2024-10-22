import { Router } from 'express';
import * as alertaController from '../controllers/alertaController';

const router = Router();

router.get('/', alertaController.getAlertas);
router.get('/:id', alertaController.getAlerta);
router.post('/', alertaController.postAlerta);
router.put('/:id', alertaController.putAlerta);
router.delete('/:id', alertaController.deleteAlerta);

export default router;