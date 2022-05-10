export type UserType = {
  id: number;
  role: "basic" | "premium";
  username: string;
  password: string;
  name: string;
};
