import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from 'src/users/dto/access_token';

interface Payload {
  sub: string;
  username?: string;
}

@Injectable()
export class AuthService {
  private readonly refreshTokens = new Map<string, string>(); // В продакшене — Redis!

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signInWithToken(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(username);

    // const user = await this.usersService.validateUser(username, pass);
    // if (!user) {
    //   throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    // }

    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, id, ...result } = user;

    // Генерируем токены
    const access_token = await this.getJwtAccessToken(id, user.username);
    const refresh_token = await this.getJwtRefreshToken(id, user.username);

    if (!access_token || !refresh_token)
      throw new HttpException('Token Error', HttpStatus.NOT_FOUND);

    this.storeRefreshToken(id, refresh_token);

    return {
      // Here the JWT secret key that's used for signing the payload
      // is the key that was passed in the JwtModule
      // access_token: await this.jwtService.signAsync(payload),
      access_token,
      refresh_token,
    };
  }

  async getNewAccessToken(userId: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneById(userId);

    const newAccessToken = await this.getJwtAccessToken(user.id, user.username);

    return { access_token: newAccessToken };
  }

  async getJwtAccessToken(id, username) {
    const payload: Payload = { sub: id, username };
    const token = new AccessToken();

    return await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
  }

  async getJwtRefreshToken(id, username) {
    const payload: Payload = { sub: id, username };
    const token = new AccessToken();

    return await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
  }

  // generateRefreshToken() {
  //   // В реальности — криптографически надёжный токен (uuid v4, crypto.randomBytes)
  //   return require('crypto').randomBytes(40).toString('hex');
  // }

  storeRefreshToken(userId: string, refreshToken: string) {
    // В продакшене: сохранить в БД/Redis с TTL = 7 дней
    this.refreshTokens.set(refreshToken, userId);
  }

  validateRefreshToken(refreshToken: string): string | null {
    return this.refreshTokens.get(refreshToken) || null;
  }

  invalidateRefreshToken(refreshToken: string) {
    this.refreshTokens.delete(refreshToken);
  }
}
