import log from "loglevel";
import { Connection } from "typeorm";
import { Movie } from "../../models/MoviesModel";
import { UserMovieAgg } from "../../models/UserMovieAgg";
import { MovieService } from "../../services/MovieService";
import { OMDBApiResponse, TokenPayload, UserRole } from "../../types";
import { RepositoryMock } from "../lib/RepositoryMock";
import { mockTypeormConnection } from "../utils/mockTypeormConnection";

let movieRepo: RepositoryMock<Movie>;
let userMovieAggRepo: RepositoryMock<UserMovieAgg>;
let movieService: MovieService;
let testOMDBResponse: OMDBApiResponse = {
  Title: "Harry Potter and the Deathly Hallows: Part 2",
  Year: "2011",
  Rated: "PG-13",
  Released: "15 Jul 2011",
  Runtime: "130 min",
  Genre: "Adventure, Fantasy, Mystery",
  Director: "David Yates",
  Writer: "Steve Kloves, J.K. Rowling",
  Actors: "Daniel Radcliffe, Emma Watson, Rupert Grint",
  Plot: "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
  Language: "English, Latin",
  Country: "United Kingdom, United States",
  Awards: "Nominated for 3 Oscars. 46 wins & 94 nominations total",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "8.1/10",
    },
    {
      Source: "Rotten Tomatoes",
      Value: "96%",
    },
    {
      Source: "Metacritic",
      Value: "85/100",
    },
  ],
  Metascore: "85",
  imdbRating: "8.1",
  imdbVotes: "843,148",
  imdbID: "tt1201607",
  Type: "movie",
  DVD: "11 Nov 2011",
  BoxOffice: "$381,447,587",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};
let testUser: TokenPayload = {
  userId: 123,
  name: "test",
  role: UserRole.basic,
};
let mockConnection: Connection;

beforeAll(() => {
  log.setLevel("DEBUG");

  movieRepo = new RepositoryMock();
  const movie = new Movie();
  const currDate = new Date();
  movie.id = 1;
  movie.title = "Test";
  movie.userId = 123;
  movie.genre = "Test";
  movie.released = currDate;
  movie.director = "Test";
  movie.createdAt = currDate;
  movie.updatedAt = currDate;
  movieRepo.one = movie;
  movieRepo.list = [movie];

  userMovieAggRepo = new RepositoryMock();
  const movieAgg = new UserMovieAgg();
  movieAgg.month = currDate.getMonth();
  movieAgg.year = currDate.getFullYear();
  movieAgg.userId = 123;
  movieAgg.numMovies = 1;

  userMovieAggRepo.one = movieAgg;
  userMovieAggRepo.list = [movieAgg];

  mockConnection = mockTypeormConnection(movieRepo, userMovieAggRepo);
  movieService = new MovieService(
    mockConnection,
    movieRepo as any,
    userMovieAggRepo as any
  );
});

describe("MovieService", () => {
  test("saveMovie method calls movieRepository save method", async () => {
    await movieService.saveMovie(testOMDBResponse, testUser.userId);
    expect(movieRepo.saveMock).toHaveBeenCalled();
  });

  test("saveMovie method calls userMovieAggregateRepo find and update method", async () => {
    await movieService.saveMovie(testOMDBResponse, testUser.userId);
    expect(userMovieAggRepo.findOneMock).toHaveBeenCalled();
    expect(userMovieAggRepo.updateMock).toHaveBeenCalledWith(
      {
        userId: testUser.userId,
      },
      {
        numMovies: userMovieAggRepo.one.numMovies + 1,
      }
    );
  });
});
