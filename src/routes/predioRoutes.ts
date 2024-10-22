import { Router } from 'express';
import * as predioController from '../controllers/predioController';

const router = Router();

router.get('/', predioController.getPredios);
router.get('/:id', predioController.getPredio);
router.post('/', predioController.postPredio);
router.put('/:id', predioController.putPredio);
router.delete('/:id', predioController.deletePredio);

export default router;