import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { PrismaModule } from './../prisma/prisma.module';
import { UsersModule } from './..//users/users.module';
import { ItemsModule } from './../items/items.module';

@Module({
  imports: [PrismaModule, UsersModule, ItemsModule],
  providers: [BidsService],
  controllers: [BidsController],
})
export class BidsModule {}
