import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  // Request,
  Res,
  Req,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ access_token: string }> {
    const result = await this.authService.signInWithToken(
      signInDto.username,
      signInDto.password,
    );

    // Устанавливаем refresh token в HttpOnly cookie
    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true в продакшене
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      path: '/auth',
    });

    return { access_token: result.access_token };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const userId = this.authService.validateRefreshToken(refreshToken);
    if (!userId) {
      res.clearCookie('refresh_token', { path: '/auth', sameSite: 'lax' });
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const result = await this.authService.getNewAccessToken(userId);

    return { access_token: result.access_token };
  }

  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) {
      this.authService.invalidateRefreshToken(refreshToken);
    }
    res.clearCookie('refresh_token', { path: '/auth' });
    return { success: true };
  }
}
