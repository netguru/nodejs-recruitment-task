declare namespace Express {
    export interface Request {
        auth: Auth
    }
}

type Auth = {
    userId: number,
    name: String,
    role: string,
    iat: number,
    exp: number,
    iss: String,
    sub: String
}

