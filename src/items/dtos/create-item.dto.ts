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

export class CreateItemDto {
  @IsString()
  @IsOptional()
  isActive?: string;

  @IsEnum(ItemStatus)
  @IsOptional()
  status?: ItemStatus;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

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

  @IsString()
  sellerId: string;
}
