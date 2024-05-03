import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UsersModule } from 'src/users/users.module';
import { AccessControlService } from 'src/auth/shared/access-control.service';

@Module({
  imports: [PrismaModule, CloudinaryModule, UsersModule],
  controllers: [ItemsController],
  providers: [ItemsService, AccessControlService],
})
export class ItemsModule {}
