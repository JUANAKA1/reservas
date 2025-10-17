import express from 'express';
import cors from 'cors';
import reservationRoutes from './routes/reservation.routes';
import authRoutes from './routes/auth.routes';
import { connectMongo } from './db/mongo.db';
import { errorHandler } from './middlewares/error.middlewares';
import { ENV } from './config/env.config';
async function bootstrap() {
  await connectMongo();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api/reservations', reservationRoutes);
  app.use('/api/auth', authRoutes);
  
  app.use(errorHandler);

  app.listen(ENV.PORT, () => {
    console.log(`API on PORT: ${ENV.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('[😑] Failed to start the application', err);
  process.exit(1);
});
