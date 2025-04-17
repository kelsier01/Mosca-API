import { Router } from 'express';
import { 
    getDuenios, 
    getDuenio, 
    postDuenio, 
    putDuenio, 
    deleteDuenio,
} from '../controllers/duenioController';

const router = Router();

// Rutas básicas CRUD
router.get('/', getDuenios);
router.get('/:id', getDuenio);
router.post('/', postDuenio);
router.put('/:id', putDuenio);
router.delete('/:id', deleteDuenio);

export default router;