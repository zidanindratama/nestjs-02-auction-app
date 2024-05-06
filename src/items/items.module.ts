import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaModule } from './../prisma/prisma.module';
import { CloudinaryModule } from './../cloudinary/cloudinary.module';
import { UsersModule } from './../users/users.module';
import { AccessControlService } from './../auth/shared/access-control.service';

@Module({
  imports: [PrismaModule, CloudinaryModule, UsersModule],
  controllers: [ItemsController],
  providers: [ItemsService, AccessControlService],
  exports: [ItemsService],
})
export class ItemsModule {}
