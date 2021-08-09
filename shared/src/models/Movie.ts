import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'date' })
  released: string;

  @Column('varchar', { array: true, length: 255 })
  genre: string[];

  @Column({ length: 255 })
  director: string;

  @Column()
  userId: number;

  @CreateDateColumn({ type: 'date' })
  createdAt: string;
}
