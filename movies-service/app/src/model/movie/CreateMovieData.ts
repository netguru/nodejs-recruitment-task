import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CreateMovieData {
  @Expose()
  @IsString()
  title!: string;
}
