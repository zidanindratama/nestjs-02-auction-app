import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryItemsDto } from './dtos/query-items.dto';
import { Prisma } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

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
      where.isActive = query.isActive;
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

    return this.prisma.item.findMany({
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
  }

  async createItem(
    sellerId: string,
    startingBidFloat: number,
    highestBidFloat: number,
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
      where.isActive = query.isActive;
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
    updateItemData: Prisma.ItemUpdateWithoutSellerInput,
  ) {
    const item = await this.getItemById(id);
    if (!item) throw new HttpException('Item not found!', 404);

    return this.prisma.item.update({
      where: { id: id },
      data: updateItemData,
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
