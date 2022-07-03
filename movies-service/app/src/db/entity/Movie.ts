import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  releasedAt!: Date;

  @Column()
  genre!: string;

  @Column()
  director!: string;

  @Column()
  createdAt!: Date;

  @Column()
  createdBy!: number; // id
}
