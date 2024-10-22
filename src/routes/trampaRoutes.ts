import { Router } from 'express';
import * as trampaController from '../controllers/trampaController';

const router = Router();

router.get('/', trampaController.getTrampas);
router.get('/:id', trampaController.getTrampa);
router.post('/', trampaController.postTrampa);
router.put('/:id', trampaController.putTrampa);
router.delete('/:id', trampaController.deleteTrampa);

export default router;