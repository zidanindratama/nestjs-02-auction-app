import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

enum Role {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export class UpdateUserDto {
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  isActive?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
