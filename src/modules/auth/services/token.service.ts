import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from '@/modules/users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { TokenResult } from '../interfaces/token-result.interface';

/*
|--------------------------------------------------------------------------
| TokenService
|--------------------------------------------------------------------------
|
| Handles all JWT-related operations.
|
| Responsibilities:
| - Build JWT payloads
| - Generate access tokens
| - Manage token expiration configuration
|
*/
@Injectable()
export class TokenService {
  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Injects required dependencies:
  | - JwtService    : Used to sign and verify JWT tokens.
  | - ConfigService : Used to retrieve token expiration settings.
  |
  */
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /*
  |--------------------------------------------------------------------------
  | buildJwtPayload
  |--------------------------------------------------------------------------
  |
  | Builds a lightweight JWT payload from the user entity.
  |
  */
  buildJwtPayload(user: User): JwtPayload {
    return {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: {
        avatar: user.profile.avatar,
        bio: user.profile.bio,
        locale: user.profile.locale,
        gender: user.profile.gender,
      },
    };
  }

  /*
  |--------------------------------------------------------------------------
  | getAccessTokenExpiresIn
  |--------------------------------------------------------------------------
  |
  | Returns access token lifetime in seconds.
  |
  */
  getAccessTokenExpiresIn(): number {
    return this.configService.get<number>('auth.jwtExpiresIn') ?? 86400;
  }

  /*
  |--------------------------------------------------------------------------
  | generateAccessToken
  |--------------------------------------------------------------------------
  |
  | Generates a signed JWT access token.
  |
  */
  generateAccessToken(user: User): TokenResult {
    const payload = this.buildJwtPayload(user);
    const expiresIn = this.getAccessTokenExpiresIn();

    return {
      token: this.jwtService.sign(payload, { expiresIn }),
      expiresIn,
    };
  }
}
