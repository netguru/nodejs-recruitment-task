import { ApiProperty } from "@nestjs/swagger";

import { UserRole } from "@app/model/user/User";

export class ReadMeData {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  role!: UserRole;
}
