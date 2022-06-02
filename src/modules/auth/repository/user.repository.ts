import { Injectable } from '@nestjs/common';
import PrismaService from '../../prisma/prisma.service';

@Injectable()
export default class PrismaUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getCustomerData(data: any): Promise<Partial<any>> {
    try {
      return await this.prismaService.users.findFirst({
        where: {
          user_id: data.userId
        },
      });
    } catch (e) {
      throw new Error(`Error find first customer Data on table users: ${e.message}`);
    }
  }

  async createUser(data: any): Promise<Partial<any>> {
    try {
      return await this.prismaService.users.create({
        data:{
          user_id: data.userId,
          year: data.year,
          month: data.month,
          num_movies: data.numMovies,
          created_at: new Date()
        }
      });
    } catch (e) {
      throw new Error(`Error on create user on table users: ${e.message}`);
    }
  }

  async update(userId, numMovies): Promise<Partial<any>> {
    try {
      return await this.prismaService.users.update({
        data:{
          num_movies: numMovies,
          updated_at: new Date()
        },
        where: {
          user_id: userId
        },
      });
    } catch (e) {
      throw new Error(`Error on update user on table users: ${e.message}`);
    }
  }
}
