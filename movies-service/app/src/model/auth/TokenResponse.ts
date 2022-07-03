import { ApiProperty } from "@nestjs/swagger";

export class TokenResponse { // class to show nicely in swagger
  @ApiProperty()
  token!: string;

  constructor(token: string) { // no short constructor also because of swagger
    this.token = token;
  }
}
