import { IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    public title: string;
}