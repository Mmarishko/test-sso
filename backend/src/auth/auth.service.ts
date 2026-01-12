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
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signInWithToken(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOne(username);

    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, id, ...result } = user;

    const access_token = await this.getJwtAccessToken(id, user.username);
    const refresh_token = await this.getJwtRefreshToken(id, user.username);

    if (!access_token || !refresh_token)
      throw new HttpException('Token Error', HttpStatus.NOT_FOUND);

    return {
      // Here the JWT secret key that's used for signing the payload
      // is the key that was passed in the JwtModule
      // access_token: await this.jwtService.signAsync(payload),
      access_token,
      refresh_token,
    };
  }

  async getJwtAccessToken(id, username) {
    const payload: Payload = { sub: id, username };
    const token = new AccessToken();
    token.access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    return token.access_token;
  }

  async getJwtRefreshToken(id, username) {
    const payload: Payload = { sub: id, username };
    const token = new AccessToken();
    token.refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '60d',
    });
    return token.refresh_token;
  }
}
