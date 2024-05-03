import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

enum Role {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export class CreateUserDto {
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  isActive?: boolean;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  password?: string;
}
