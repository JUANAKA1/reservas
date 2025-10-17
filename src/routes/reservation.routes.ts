import { Router } from 'express';
import {
  createReservation,
  deleteReservation,
  getReservations,
  getReservationsById,
  updateReservation,
} from '../controllers/resevation.controller';
import { authGuard } from '../middlewares/auth.middlewares';

const router = Router();

router.post('/', createReservation);

router.use(authGuard);

router.get('/', getReservations);
router.get('/:id', getReservationsById);
router.patch('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;
