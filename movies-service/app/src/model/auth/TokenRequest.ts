import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class TokenRequest {
  @ApiProperty()
  @Expose()
  @IsString()
  username!: string;

  @ApiProperty()
  @Expose()
  @IsString()
  password!: string;
}
