import { IsString, IsNotEmpty } from 'class-validator';

export default class AuthInterface {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
