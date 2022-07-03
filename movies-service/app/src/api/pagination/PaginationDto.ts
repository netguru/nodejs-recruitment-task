import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

import { PaginationData } from "@app/model/common/PaginationData";

export class PaginationDto implements PaginationData {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @Expose()
  page: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(200)
  @IsOptional()
  @Type(() => Number)
  @Expose()
  perPage: number;

  constructor(page: number, perPage: number) {
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    if (isNaN(perPage) || perPage < 1) {
      perPage = 20;
    }
    if (perPage > 200) {
      perPage = 200;
    }

    this.page = page ?? 1;
    this.perPage = perPage ?? 20;
  }

  getPage(): number {
    return this.page;
  }

  getPerPage(): number {
    return this.perPage;
  }
}
