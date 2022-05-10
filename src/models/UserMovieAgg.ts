import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@Index(["userId", "year", "month"])
@Index(["userId"])
export class UserMovieAgg {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId!: number;

  @Column({ nullable: false })
  year!: number;

  @Column({ nullable: false })
  month!: number;

  @Column({ nullable: false, default: 1 })
  numMovies!: number;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
