import { Router } from 'express';
import { createReservation } from '../controllers/resevation.controller';

const router = Router();

router.post('/', createReservation);

export default router;
