import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { QueryItemsDto } from './dtos/query-items.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { AccessTokenGuard } from './../auth/guards/access-token.guard';
import { Roles } from './../auth/decorators/roles.decorator';
import { RoleGuard } from './../auth/guards/role.guard';
import { Role } from './../auth/enums/role.enum';

@UseGuards(AccessTokenGuard)
@Controller('/protected/items')
export class ItemsController {
  constructor(
    private itemsService: ItemsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  getAllItems(@Query() query: QueryItemsDto) {
    return this.itemsService.getAllItems(query);
  }

  @Get('/:id')
  async getItemById(@Param('id') id: string) {
    const item = await this.itemsService.getItemById(id);
    if (!item) throw new HttpException('Item not found!', 404);
    return item;
  }

  @Get('/seller/:id')
  async getItemBySellerId(
    @Param('id') id: string,
    @Query() query: QueryItemsDto,
  ) {
    const item = await this.itemsService.getItemBySellerId(id, query);
    if (!item) throw new HttpException('Item not found!', 404);
    return item;
  }

  @Roles(Role.SELLER)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createItem(
    @Body() body: CreateItemDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      const uploadedImage = await this.cloudinaryService.uploadFile(image);
      body.image = uploadedImage.secure_url;
    }
    const { sellerId, startingBid, highestBid, isActive, ...rest } = body;
    const startingBidFloat = parseFloat(startingBid);
    const highestBidFloat = parseFloat(highestBid);
    return this.itemsService.createItem(
      sellerId,
      startingBidFloat,
      highestBidFloat,
      isActive,
      rest,
    );
  }

  @Roles(Role.ADMINISTRATOR, Role.SELLER)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateItemById(
    @Param('id') id: string,
    @Body() body: UpdateItemDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      const uploadedImage = await this.cloudinaryService.uploadFile(image);
      body.image = uploadedImage.secure_url;
    }
    const { isActive, startingBid, highestBid, ...rest } = body;
    const startingBidFloat = parseFloat(startingBid);
    const highestBidFloat = parseFloat(highestBid);
    return this.itemsService.updateItemById(
      id,
      isActive,
      startingBidFloat,
      highestBidFloat,
      rest,
    );
  }

  @Roles(Role.ADMINISTRATOR, Role.SELLER)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    return this.itemsService.deleteItemById(id);
  }
}
