declare namespace Express {
  export interface Request {
    auth: Auth
  }
}

type Auth = {
  id?: String,
  accessLevels: String[]
}