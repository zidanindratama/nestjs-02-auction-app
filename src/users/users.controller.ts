import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { QueryUsersDto } from './dtos/query-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AccessTokenGuard } from './../auth/guards/access-token.guard';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { RoleGuard } from './../auth/guards/role.guard';
import { Role } from './../auth/enums/role.enum';
import { Roles } from './../auth/decorators/roles.decorator';

@UseGuards(AccessTokenGuard)
@Controller('/protected/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Roles(Role.ADMINISTRATOR)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get()
  getAllUser(@Query() query: QueryUsersDto) {
    return this.usersService.getAllUser(query);
  }

  @Get('/email')
  async getUserByEmail(@Query() { email }: QueryUsersDto) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new HttpException('User not found!', 404);
    return user;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new HttpException('User not found!', 404);
    return user;
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateUserById(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      const uploadedImage = await this.cloudinaryService.uploadFile(image);
      body.image = uploadedImage.secure_url;
    }
    const { isActive, ...rest } = body;
    return this.usersService.updateUserById(id, isActive, rest);
  }

  @Roles(Role.ADMINISTRATOR)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
