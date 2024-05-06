import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { QueryUsersDto } from './dtos/query-users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(query: QueryUsersDto) {
    const pgNum = +(query.pgNum ?? 1);
    const pgSize = +(query.pgSize ?? 10);

    const skip = (pgNum - 1) * pgSize;
    const take = pgSize;

    const where: Prisma.UserWhereInput = {};
    if (query.name) {
      where.name = { contains: query.name };
    }

    const users = await this.prisma.user.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        role: true,
        isActive: true,
        email: true,
        name: true,
        image: true,
        bio: true,
      },
    });

    const userCount = await this.prisma.user.count();
    const buyerCount = await this.prisma.user.count({
      where: {
        role: {
          equals: 'BUYER',
        },
        isActive: {
          equals: true,
        },
      },
    });
    const sellerCount = await this.prisma.user.count({
      where: {
        role: {
          equals: 'SELLER',
        },
        isActive: {
          equals: true,
        },
      },
    });

    return {
      users,
      meta: {
        count: userCount,
        buyerCount,
        sellerCount,
      },
    };
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        role: true,
        isActive: true,
        email: true,
        name: true,
        image: true,
        bio: true,
      },
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  createUser(createUserData: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...createUserData,
      },
      select: {
        id: true,
        role: true,
        isActive: true,
        email: true,
        name: true,
        image: true,
        bio: true,
      },
    });
  }

  async updateUserById(
    id: string,
    isActive: string,
    updateUserData: Prisma.UserUpdateInput,
  ) {
    const user = await this.getUserById(id);
    if (!user) throw new HttpException('User not found!', 404);

    return this.prisma.user.update({
      where: { id: id },
      data: {
        ...updateUserData,
        isActive: isActive === 'true' ? true : false,
      },
      select: {
        id: true,
        role: true,
        isActive: true,
        email: true,
        name: true,
        image: true,
        bio: true,
      },
    });
  }

  async deleteUserById(id: string) {
    const user = await this.getUserById(id);
    if (!user) throw new HttpException('User not found!', 404);

    await this.prisma.user.delete({
      where: { id: id },
    });

    return {
      message: 'Successfully delete the user!',
      statusCode: 200,
    };
  }
}
