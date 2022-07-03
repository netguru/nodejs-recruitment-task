import {Injectable} from "@nestjs/common";
import axios from "axios";
import {Configuration} from "@app/logic/service/configuration/Configuration";

export interface OMDBRating {
  Source: string;
  Value: string;
}

export interface OMDBMovie {
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
  Ratings: OMDBRating[];
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
}

@Injectable()
export class OMDBApiClient {
  private readonly apiUrl = "http://www.omdbapi.com/";

  constructor(private readonly configuration: Configuration) { }

  public async fetchDataByTitle(title: string): Promise<OMDBMovie | null> {
    try {
      const response = await axios.get<OMDBMovie>(`${this.apiUrl}?t=${encodeURIComponent(title)}&apikey=${this.configuration.omdbApiKey}`);
      return response.data;
    } catch (e){
      return null;
    }
  }
}
