import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: 3000,
  JWT_SECRET: process.env.JWT_SECRET,
};
