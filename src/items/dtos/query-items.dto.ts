import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum ItemStatus {
  PERMITTED = 'PERMITTED',
  NOT_PERMITTED = 'NOT_PERMITTED',
}

export class QueryItemsDto {
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
  image?: string;

  @IsString()
  @IsOptional()
  sellerId?: string;

  @IsString()
  @IsOptional()
  pgNum?: string;

  @IsString()
  @IsOptional()
  pgSize?: string;

  @IsString()
  @IsOptional()
  startingBid?: string;

  @IsString()
  @IsOptional()
  highestBid?: string;

  @IsString()
  description: string;

  @IsDateString()
  startBidDate: Date;

  @IsDateString()
  endBidDate: Date;
}
