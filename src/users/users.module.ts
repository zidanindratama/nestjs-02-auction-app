import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from './../prisma/prisma.module';
import { AccessControlService } from '../auth/shared/access-control.service';
import { CloudinaryModule } from './../cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService, AccessControlService],
  exports: [UsersService],
})
export class UsersModule {}
