export enum UserRole {
  basic = "basic",
  premium = "premium",
}

export interface User {
  userId: number;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}
