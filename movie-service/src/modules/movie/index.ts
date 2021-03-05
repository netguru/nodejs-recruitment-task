/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './controllers';
import { MovieRepository } from './repositories/movie.repository';
import { Movie, MovieSchema } from './schemas';
import { MovieService } from './services';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeatureAsync([
      {
        name: Movie.name,
        useFactory: () => {
          const schema = MovieSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [MovieController],
  exports: [],
  providers: [MovieRepository, MovieService],
})
export class MovieModule {}
