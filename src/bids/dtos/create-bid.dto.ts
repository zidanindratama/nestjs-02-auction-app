import { IsOptional, IsString } from 'class-validator';

export class CreateBidDto {
  @IsString()
  itemId: string;

  @IsString()
  bidderId: string;

  @IsString()
  amount: string;
}
