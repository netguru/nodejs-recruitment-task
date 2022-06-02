import { Injectable } from '@nestjs/common';
import PrismaService from '../../prisma/prisma.service';
import Movie from '../interface/movie-repo.interface'
@Injectable()
export default class PrismaMoviesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMovie(data: Movie, userId: number) {
    try {
      return await this.prismaService.movies.create({
        data:{
          user_id: userId,
          title: data.Title,
          released: new Date(data.Released),
          genre: data.Genre,
          director: data.Director,
          created_at: new Date()
        }
      });
    } catch (e) {
      throw new Error(`Error on create movie on table movies: ${e.message}`);
    }
  }

  async getCustomerData(userId: number){
    try {
      return await this.prismaService.movies.findMany({
        where: {
          user_id: userId
        },
      });
    } catch (e) {
      throw new Error(`Error find many customer Data on table movies: ${e.message}`);
    }
  }
}
