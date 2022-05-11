import { Movie } from "../../models/MoviesModel";
import { UserMovieAgg } from "../../models/UserMovieAgg";
import { RepositoryMock } from "../lib/RepositoryMock";

export const mockTypeormConnection = (
  movieRepo: RepositoryMock<Movie>,
  userMovieAggRepo: RepositoryMock<UserMovieAgg>
) => {
  const mockConnection = jest.fn();

  mockConnection.mockImplementation(() => {
    return {
      createQueryRunner() {
        return {
          startTransaction: jest.fn(),
          release: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          manager: {
            getCustomRepository(repo: any) {
              if (repo.one instanceof Movie) {
                return movieRepo;
              }
              return userMovieAggRepo;
            },
          },
        };
      },
    };
  });
  const impl = mockConnection.getMockImplementation()!;
  return impl();
};
