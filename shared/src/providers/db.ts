import { createConnection } from 'typeorm';

import { Movie } from '../models/Movie';

export const init = (): void => {
  createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Movie],
  })
    .then(() => {
      console.log(`Db connection established on: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    })
    .catch((err) => {
      console.log(err);
      console.log('\n!!!Database connection problem!!!\n');
      process.exit(1);
    });
};
