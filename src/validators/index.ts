import { IsString, MinLength } from "class-validator";

export class LoginUserBody {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

export class SaveMovieBody {
  @IsString()
  @MinLength(1)
  title!: string;
}
