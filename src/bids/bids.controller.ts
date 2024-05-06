import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BidsService } from './bids.service';
import { QueryBidsDto } from './dtos/query-bids.dto';
import { CreateBidDto } from './dtos/create-bid.dto';

@Controller('/protected/bids')
export class BidsController {
  constructor(private bidsService: BidsService) {}

  @Get()
  getAllBids(@Query() query: QueryBidsDto) {
    return this.bidsService.getAllBids(query);
  }

  @Get('/highest/:id')
  getHighestBid(@Param('id') id: string) {
    return this.bidsService.getHighestBid(id);
  }

  @Post()
  async createBid(@Body() body: CreateBidDto) {
    const { bidderId, itemId, amount } = body;
    const amountFloat = parseFloat(amount);
    return this.bidsService.createBid(bidderId, itemId, amountFloat);
  }
}
