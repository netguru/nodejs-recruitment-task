import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import MovieController from './movie.controller';
import MovieService from './movie.service';
import PrismaModule from '../prisma/prisma.module';
import PrismaMoviesRepository from './repository/movies.repository';
import GetMovieOmdb from '../omdb/omdb.service';
import PrismaUsersRepository from '../auth/repository/user.repository';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
  ],
  controllers: [MovieController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: PrismaUsersRepository,
    },
    {
      provide: 'MOVIE_REPOSITORY',
      useClass: PrismaMoviesRepository,
    },
    MovieService,
    GetMovieOmdb
  ],
})
export default class MovieModule {}
