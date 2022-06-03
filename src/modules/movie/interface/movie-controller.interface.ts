import { IsString, IsNotEmpty } from 'class-validator';

export default class MovieInterface {
  @IsNotEmpty()
  @IsString()
  title: string;
}
