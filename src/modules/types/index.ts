export enum UserRole {
  basic = "basic",
  premium = "premium",
}

export type UserType = {
  id: number;
  role: UserRole;
  username: string;
  password: string;
  name: string;
};

export type TokenPayload = {
  userId: number;
  name: string;
  role: UserRole;
};
