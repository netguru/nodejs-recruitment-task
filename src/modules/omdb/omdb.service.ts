import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export default class GetMovieOmdb {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  public async getMovieByTitle(data: string){
    try {
      const omdbUrl = this.configService.get('OMDB');
      const key = this.configService.get('API_KEY_OMDB');

      const response = await axios.get(
        `${omdbUrl}`, {
          params: {
            t: data,
            apikey: key
          }
        }
      );

      return response.data;
    } catch (error) {
      this.logger.log('Error calling omdb to get movie by title.');
      this.logger.error(error);
      throw new Error(error.message);
    }
  }
}
