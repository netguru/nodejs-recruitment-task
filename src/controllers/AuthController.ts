import { Response } from "express";
import { Body, Controller, Post, Res } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AuthService } from "../services/AuthService";
import { AuthError } from "../utils/errors";
import { LoginUserBody } from "../validators";

@Controller("/auth")
@Service()
export class AuthController {
  constructor(
    @Inject()
    private authService: AuthService
  ) {}

  @Post("/login")
  async login(
    @Body() { username, password }: LoginUserBody,
    @Res() response: Response
  ) {
    try {
      const token = this.authService.getToken(username, password);
      return response.json({ token });
    } catch (error) {
      if (error instanceof AuthError) {
        return response.status(400).json(error.message);
      }
      return response.status(500).json("Something went wrong!");
    }
  }
}
