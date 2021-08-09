interface User {
  role: string;
  name: string;
}

export interface UserDB extends User {
  id: number;
  username: string;
  password: string;
}

export interface UserJWT extends User {
  userId: number;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}
