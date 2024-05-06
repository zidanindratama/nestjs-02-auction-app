import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { QueryItemsDto } from './dtos/query-items.dto';
import { PrismaService } from './../prisma/prisma.service';
import { UsersService } from './../users/users.service';

@Injectable()
export class ItemsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async getAllItems(query: QueryItemsDto) {
    const pgNum = +(query.pgNum ?? 1);
    const pgSize = +(query.pgSize ?? 10);
    const skip = (pgNum - 1) * pgSize;
    const take = pgSize;

    const where: Prisma.ItemWhereInput = {};

    if (query.isActive !== undefined) {
      if (query.isActive === 'true') {
        where.isActive = true;
      } else {
        where.isActive = false;
      }
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.name) {
      where.name = { contains: query.name };
    }

    if (query.image) {
      where.image = { contains: query.image };
    }

    if (query.sellerId) {
      where.sellerId = query.sellerId;
    }

    const itemCount = await this.prisma.item.count();
    const activeItemCount = await this.prisma.item.count({
      where: {
        isActive: {
          equals: true,
        },
      },
    });

    const permittedItemCount = await this.prisma.item.count({
      where: {
        status: {
          equals: 'PERMITTED',
        },
      },
    });

    const items = await this.prisma.item.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        name: true,
        isActive: true,
        status: true,
        image: true,
        startBidDate: true,
        endBidDate: true,
        highestBid: true,
        startingBid: true,
        description: true,
        seller: { select: { id: true, name: true, email: true } },
      },
    });

    return {
      items,
      meta: {
        count: itemCount,
        activeItemCount,
        permittedItemCount,
      },
    };
  }

  async createItem(
    sellerId: string,
    startingBidFloat: number,
    highestBidFloat: number,
    isActive: string,
    createItemData: Prisma.ItemCreateWithoutSellerInput,
  ) {
    const isSeller = await this.usersService.getUserById(sellerId);
    if (isSeller.role !== 'SELLER')
      throw new HttpException('This user is not authorized', 403);

    return this.prisma.item.create({
      data: {
        ...createItemData,
        sellerId: sellerId,
        startingBid: startingBidFloat,
        highestBid: highestBidFloat,
        isActive: isActive === 'true' ? true : false,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        status: true,
        image: true,
        startBidDate: true,
        endBidDate: true,
        highestBid: true,
        startingBid: true,
        description: true,
        seller: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async getItemById(id: string) {
    return this.prisma.item.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        isActive: true,
        status: true,
        image: true,
        startBidDate: true,
        endBidDate: true,
        highestBid: true,
        startingBid: true,
        description: true,
        seller: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async getItemBySellerId(sellerId: string, query: QueryItemsDto) {
    const pgNum = +(query.pgNum ?? 1);
    const pgSize = +(query.pgSize ?? 10);
    const skip = (pgNum - 1) * pgSize;
    const take = pgSize;

    const where: Prisma.ItemWhereInput = {};

    if (query.isActive !== undefined) {
      if (query.isActive === 'true') {
        where.isActive = true;
      } else {
        where.isActive = false;
      }
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.name) {
      where.name = { contains: query.name };
    }

    if (query.image) {
      where.image = { contains: query.image };
    }

    if (query.sellerId) {
      where.sellerId = query.sellerId;
    }

    const item = await this.prisma.item.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        name: true,
        isActive: true,
        status: true,
        image: true,
        startBidDate: true,
        endBidDate: true,
        highestBid: true,
        startingBid: true,
        description: true,
        seller: { select: { id: true, name: true, email: true } },
      },
    });

    return item;
  }

  async updateItemById(
    id: string,
    isActive: string,
    startingBidFloat: number,
    highestBidFloat: number,
    updateItemData: Prisma.ItemUpdateWithoutSellerInput,
  ) {
    const item = await this.getItemById(id);
    if (!item) throw new HttpException('Item not found!', 404);

    return this.prisma.item.update({
      where: { id: id },
      data: {
        ...updateItemData,
        isActive: isActive === 'true' ? true : false,
        startingBid: startingBidFloat,
        highestBid: highestBidFloat,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
        status: true,
        image: true,
        startBidDate: true,
        endBidDate: true,
        highestBid: true,
        startingBid: true,
        description: true,
        seller: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async deleteItemById(id: string) {
    const item = await this.getItemById(id);
    if (!item) throw new HttpException('Item not found!', 404);

    await this.prisma.item.delete({
      where: { id: id },
    });

    return {
      message: 'Successfully delete the item!',
      statusCode: 200,
    };
  }
}
