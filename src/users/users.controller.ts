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
import { UsersService } from './users.service';
import { QueryUsersDto } from './dtos/query-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/enums/role.enum';

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
  @UseInterceptors(FileInterceptor('file'))
  async updateUserById(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadFile(file);
      body.image = uploadedImage.secure_url;
    }
    return this.usersService.updateUserById(id, body);
  }

  @Roles(Role.ADMINISTRATOR)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
