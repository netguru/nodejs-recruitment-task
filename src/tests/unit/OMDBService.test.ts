import axios from "axios";
import { OMDBService } from "../../services/OMDBService";
import { APIError } from "../../utils/errors";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
let omdbService: OMDBService;

describe("OMDBService", () => {
  beforeAll(() => {
    omdbService = new OMDBService(mockedAxios);
  });

  test("searchByTitle method should call OMDB API with correct parameters", async () => {
    const title = "test 123";
    const testResp = {
      Title: title,
      Year: "2022",
    };
    mockedAxios.get.mockResolvedValueOnce({
      data: testResp,
    });
    const resp = await omdbService.searchByTitle(title);
    expect(mockedAxios.get).toHaveBeenCalledWith("/", {
      params: {
        t: title,
      },
    });
    expect(resp).toBe(testResp);
  });

  test("searchByTitle method should throw error when invalid response received from OMDB API", async () => {
    const testResp = {
      Error: "something went wrong!",
    };
    mockedAxios.get.mockResolvedValueOnce({
      data: testResp,
    });
    expect(omdbService.searchByTitle("test")).rejects.toThrowError(
      new APIError(testResp.Error, 404)
    );
  });
});
