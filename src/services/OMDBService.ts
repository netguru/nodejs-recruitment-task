import axios from "axios";
import log from "loglevel";
import { Service } from "typedi";
import { OMDBApiResponse } from "../types";
import { APIError } from "../utils/errors";

@Service()
export class OMDBService {
  constructor(
    private apiClient = axios.create({
      baseURL: "http://www.omdbapi.com",
      params: {
        apikey: process.env.OMDB_API_KEY,
      },
    })
  ) {}

  async searchByTitle(title: string) {
    try {
      const resp = await this.apiClient.get<OMDBApiResponse>("/", {
        params: {
          t: title,
        },
      });
      log.debug("response from omdb:", resp.data);
      if (resp.data.Error) {
        throw new APIError(resp.data.Error, 404);
      }
      return resp.data;
    } catch (error) {
      log.error(error);
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError("Something went wrong!", 500);
    }
  }
}
