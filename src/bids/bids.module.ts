import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [PrismaModule, UsersModule, ItemsModule],
  providers: [BidsService],
  controllers: [BidsController],
})
export class BidsModule {}
