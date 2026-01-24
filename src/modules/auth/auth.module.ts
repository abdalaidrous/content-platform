import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from '@/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@/modules/auth/services/auth.service';
import { PasswordService } from '@/modules/auth/services/password.service';
import { TokenService } from '@/modules/auth/services/token.service';

/*
|--------------------------------------------------------------------------
| AuthModule
|--------------------------------------------------------------------------
|
| The AuthModule encapsulates all authentication-related functionality.
|
| Responsibilities:
| - Expose authentication HTTP endpoints (login).
| - Provide AuthService for handling authentication logic.
| - Register JWT strategy for token validation.
| - Integrate Passport and JWT modules.
|
| This module depends on UsersModule to validate user credentials
| and retrieve user-related data.
|
*/
@Module({
  /*
  |--------------------------------------------------------------------------
  | imports
  |--------------------------------------------------------------------------
  |
  | Registers required modules needed by AuthService and JwtStrategy.
  |
  | - UsersModule     : Provides UsersService for user validation.
  | - PassportModule  : Integrates Passport authentication framework.
  | - JwtModule       : Provides JwtService for signing JWT tokens.
  |
  */
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('auth.jwtSecret'),
        signOptions: {
          expiresIn: config.get('auth.jwtExpiresIn') ?? '1d',
        },
      }),
    }),
  ],

  /*
  |--------------------------------------------------------------------------
  | controllers
  |--------------------------------------------------------------------------
  |
  | Exposes authentication-related HTTP endpoints.
  |
  */
  controllers: [AuthController],

  /*
  |--------------------------------------------------------------------------
  | providers
  |--------------------------------------------------------------------------
  |
  | Registers authentication services and strategies.
  |
  | - AuthService : Handles login and token generation.
  | - JwtStrategy : Validates incoming JWT access tokens.
  |
  */
  providers: [AuthService, PasswordService, TokenService, JwtStrategy],
})
export class AuthModule {}
