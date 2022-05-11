import { getConnection } from "typeorm";

export const seed = async () => {
  const conn = getConnection();
  await conn.query(
    `insert into movie(userId, title, released, genre, director) 
    values(123, 'test1', '1990-01-02', 'test1, test1', 'test1'),
    (123, 'test2', '1990-01-02', 'test2, test2', 'test2');`
  );
};
