import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CreateMovieData {
  @ApiProperty()
  @Expose()
  @IsString()
  title!: string;
}
