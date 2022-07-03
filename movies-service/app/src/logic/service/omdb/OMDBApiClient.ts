import { Injectable } from "@nestjs/common";
import axios from "axios";

import { Configuration } from "@app/logic/service/configuration/Configuration";

export interface OMDBMovie {
  Title: string; // eslint-disable-line
  Released: string; // eslint-disable-line
  Genre: string; // eslint-disable-line
  Director: string; // eslint-disable-line
}

@Injectable()
export class OMDBApiClient {
  private readonly apiUrl = "http://www.omdbapi.com/";

  constructor(private readonly configuration: Configuration) {}

  public async fetchDataByTitle(title: string): Promise<OMDBMovie | null> {
    try {
      const response = await axios.get<OMDBMovie>(
        `${this.apiUrl}?t=${encodeURIComponent(title)}&apikey=${this.configuration.omdbApiKey}`
      );
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
