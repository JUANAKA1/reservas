import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { reservationModel } from '../models/reservation.model';

const NOT_FOUND_MESSAGE = 'Reservación no encontrada! 🤔';

// 🟢 Crear reservación
export async function createReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reservation = await reservationModel.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
}

// 📋 Consultar todas las reservaciones
export async function getReservations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reservations = await reservationModel
      .find()
      .sort({ createdAt: -1 })
      .lean();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
}

// 🔍 Consultar reservación por ID
export async function getReservationsById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: NOT_FOUND_MESSAGE });
    }

    const reservation = await reservationModel.findById(id).lean();
    if (!reservation) {
      return res.status(404).json({ message: NOT_FOUND_MESSAGE });
    }

    res.json(reservation);
  } catch (error) {
    next(error);
  }
}

// ✏️ Actualizar reservación
export async function updateReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const body = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: NOT_FOUND_MESSAGE });
    }

    const reservationUpdate = await reservationModel
      .findByIdAndUpdate(id, body, { new: true })
      .lean();

    if (!reservationUpdate) {
      return res.status(404).json({ message: NOT_FOUND_MESSAGE });
    }

    res.json(reservationUpdate);
  } catch (error) {
    next(error);
  }
}

// 🗑️ Eliminar reservación
export async function deleteReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: NOT_FOUND_MESSAGE });
    }

    const reservationDelete = await reservationModel
      .findByIdAndDelete(id)
      .lean();
    if (!reservationDelete) {
      return res.status(404).json({ message: NOT_FOUND_MESSAGE });
    }

    // Opción 1: devolver mensaje
    res.status(200).json({
      message: 'Reservación eliminada correctamente 🗑️',
      data: reservationDelete,
    });
  } catch (error) {
    next(error);
  }
}
