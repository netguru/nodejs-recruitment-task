import { IsString } from "class-validator";

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

export type OMDBApiResponse = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
};

export class LoginResponse {
  @IsString()
  token: string;
}
