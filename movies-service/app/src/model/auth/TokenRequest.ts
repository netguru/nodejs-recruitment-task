import {IsString} from "class-validator";
import {Expose} from "class-transformer";

export class TokenRequest {
  @Expose()
  @IsString()
  username!: string;

  @Expose()
  @IsString()
  password!: string;
}
