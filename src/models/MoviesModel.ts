import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId!: number;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false, type: "date" })
  released!: Date;

  @Column({ nullable: false })
  genre: string;

  @Column({ nullable: false })
  director: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
