import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONHO_URI || 'mongodb://localhost:27017/reservation',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
};
