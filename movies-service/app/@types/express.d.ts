declare namespace Express {
  interface Request {
    authenticatedUser?: import("@app/model/user/User").User;
  }
}
