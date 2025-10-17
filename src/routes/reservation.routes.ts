import { Router } from 'express';
import {
  createReservation,
  deleteReservation,
  getReservations,
  getReservationsById,
  updateReservation,
} from '../controllers/resevation.controller';

const router = Router();

router.get('/', getReservations);
router.post('/', createReservation);
router.get('/:id', getReservationsById);
router.patch('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;
