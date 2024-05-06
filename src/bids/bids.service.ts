import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { UsersService } from './../users/users.service';
import { ItemsService } from './../items/items.service';
import { QueryBidsDto } from './dtos/query-bids.dto';

@Injectable()
export class BidsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private itemsService: ItemsService,
  ) {}

  async getAllBids(query: QueryBidsDto) {
    const pgNum = +(query.pgNum ?? 1);
    const pgSize = +(query.pgSize ?? 10);
    const skip = (pgNum - 1) * pgSize;
    const take = pgSize;

    const where: Prisma.BidWhereInput = {};
    if (query.bidderId) {
      where.bidderId = query.bidderId;
    }

    if (query.itemId) {
      where.itemId = query.itemId;
    }

    const count = await this.prisma.bid.count();

    const items = await this.prisma.bid.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        amount: true,
        bidderId: true,
        itemId: true,
        item: {
          select: {
            name: true,
          },
        },
        bidder: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      items,
      meta: {
        count,
      },
    };
  }

  async createBid(bidderId: string, itemId: string, amount: number) {
    const isBuyer = await this.userService.getUserById(bidderId);
    if (isBuyer.role !== 'BUYER') return new HttpException('Unauthorized', 401);
    if (isBuyer.isActive === false)
      return new HttpException("You can't bid now", 400);

    const item = await this.itemsService.getItemById(itemId);
    if (new Date() > item.endBidDate) {
      return new HttpException(
        'Bidding on this item is no longer allowed',
        400,
      );
    }

    const highestBid = await this.getHighestBid(itemId);
    if (highestBid.amount && amount <= highestBid.amount) {
      return new HttpException(
        'Bid amount must be higher than the current highest bid',
        400,
      );
    }

    const existingBid = await this.prisma.bid.findFirst({
      where: {
        itemId: itemId,
        bidderId: bidderId,
      },
      orderBy: {
        amount: 'desc',
      },
    });

    if (existingBid) {
      const updatedBid = await this.prisma.bid.update({
        where: {
          id: existingBid.id,
        },
        data: {
          amount,
        },
        select: {
          id: true,
          amount: true,
          bidderId: true,
          itemId: true,
          item: {
            select: {
              name: true,
            },
          },
          bidder: {
            select: {
              name: true,
            },
          },
        },
      });
      return updatedBid;
    } else {
      const newBid = await this.prisma.bid.create({
        data: {
          amount,
          bidderId,
          itemId,
        },
        select: {
          id: true,
          amount: true,
          bidderId: true,
          itemId: true,
          item: {
            select: {
              name: true,
            },
          },
          bidder: {
            select: {
              name: true,
            },
          },
        },
      });
      return newBid;
    }
  }

  async getHighestBid(id: string) {
    const highestBid = await this.prisma.bid.findFirst({
      where: { itemId: id },
      orderBy: { amount: 'desc' },
      include: {
        bidder: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!highestBid) return { amount: 0, bidder: { id: null, name: null } };

    return highestBid;
  }

  async updateBid(
    id: string,
    bidderId: string,
    itemId: string,
    amount: number,
  ) {
    const isBuyer = await this.userService.getUserById(bidderId);
    if (isBuyer.role !== 'BUYER') return new HttpException('Unauthorized', 401);
    if (isBuyer.isActive === false)
      return new HttpException("You can't bid now", 400);

    const item = await this.itemsService.getItemById(itemId);
    if (new Date() > item.endBidDate) {
      return new HttpException(
        'Bidding on this item is no longer allowed',
        400,
      );
    }

    const highestBid = await this.getHighestBid(itemId);
    if (highestBid.amount && amount <= highestBid.amount) {
      return new HttpException(
        'Bid amount must be higher than the current highest bid',
        400,
      );
    }

    const bid = await this.prisma.bid.update({
      where: {
        id: id,
      },
      data: {
        amount,
        bidderId,
        itemId,
      },
      select: {
        id: true,
        amount: true,
        bidderId: true,
        itemId: true,
        item: {
          select: {
            name: true,
          },
        },
        bidder: {
          select: {
            name: true,
          },
        },
      },
    });

    return bid;
  }
}
