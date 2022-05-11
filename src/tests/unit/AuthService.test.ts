import { AuthService } from "../../services/AuthService";
import { AuthError } from "../../utils/errors";

let authService: AuthService;
process.env.SECRET = "test";

describe("AuthService", () => {
  beforeAll(() => {
    authService = new AuthService();
  });

  test("getToken method should return JWT with correct username and password", async () => {
    const token = authService.getToken("basic-thomas", "sR-_pcoow-27-6PAwCD8");
    expect(token).toBeTruthy();
  });

  test("getToken method should throw error when username or password is incorrect", async () => {
    try {
      authService.getToken("test", "test");
    } catch (error) {
      expect(error).toStrictEqual(
        new AuthError("username or password is invalid")
      );
    }
  });
});
