import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateMovieData {
  @ApiProperty()
  @Expose()
  @IsString()
  title!: string;
}
