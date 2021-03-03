import { Controller, Get } from '@nestjs/common';

@Controller()
export class MovieController {
  constructor() {}

  @Get('movies')
  async getMovies(): Promise<string> {
    return 'some movies';
  }
}
