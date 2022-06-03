// eslint-disable-next-line no-shadow
export enum UserRole {
  basic = 'basic',
  premium = 'premium',
}

export type TokenPayload = {
  userId: number;
  name: string;
  role: UserRole;
};
