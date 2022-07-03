import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

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
