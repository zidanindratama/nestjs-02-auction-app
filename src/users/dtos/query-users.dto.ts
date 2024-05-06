import { IsEmail, IsOptional, IsString, isEmail } from 'class-validator';

export class QueryUsersDto {
  @IsString()
  @IsOptional()
  pgNum?: string;

  @IsString()
  @IsOptional()
  pgSize?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail()
  email?: string;
}
