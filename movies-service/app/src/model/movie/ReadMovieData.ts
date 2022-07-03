import {ApiProperty} from "@nestjs/swagger";

export class ReadMovieData {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  releasedAt!: Date;

  @ApiProperty()
  genre!: string;

  @ApiProperty()
  director!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  createdBy!: number;
}
