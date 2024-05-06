import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum ItemStatus {
  PERMITTED = 'PERMITTED',
  NOT_PERMITTED = 'NOT_PERMITTED',
}

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  isActive?: string;

  @IsEnum(ItemStatus)
  @IsOptional()
  status?: ItemStatus;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  startingBid?: string;

  @IsString()
  @IsOptional()
  highestBid?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  sellerId?: string;
}
