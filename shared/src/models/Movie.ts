import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  released: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  userId: number;
}
