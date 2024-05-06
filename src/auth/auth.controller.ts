import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { Request, Response } from 'express';
import { AuthDto } from './dtos/auth.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getCookies(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    return request.cookies;
  }

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, ...user } =
      await this.authService.signUp(createUserDto);

    if (accessToken && refreshToken)
      response.cookie('refreshToken', refreshToken, { httpOnly: false });

    return { ...user, access_token: accessToken };
  }

  @Post('signin')
  async signin(
    @Body() authDto: AuthDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.cookies.refreshToken)
      throw new UnauthorizedException('User already logged in!');

    const { accessToken, refreshToken, ...user } =
      await this.authService.signIn(authDto);

    if (accessToken && refreshToken)
      response.cookie('refreshToken', refreshToken, { httpOnly: false });

    return { ...user, access_token: accessToken };
  }

  @UseGuards(AccessTokenGuard)
  @Delete('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refreshToken');

    return this.authService.logout();
  }
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refreshTokens(@Req() request: Request) {
    const userId = request.user['sub'];
    const tokens = await this.authService.refreshTokens(userId);

    return { access_token: tokens.accessToken };
  }
}
