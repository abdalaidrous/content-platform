import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { AnonymousGuard } from '@/common/guards/anonymous.guard';
import { ForgotPasswordDto } from '@/modules/auth/dto/forgot-password.dto';
import { AuthService } from '@/modules/auth/services/auth.service';
import { PasswordService } from '@/modules/auth/services/password.service';
import { ResetPasswordDto } from '@/modules/auth/dto/reset-password.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import type { AuthUser } from '@/common/interfaces/auth-user.interface';
import { ChangePasswordDto } from '@/modules/auth/dto/change-password.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { SuccessResponse } from '@/common/interfaces/success-response.interface';
import { RegisterDto } from '@/modules/auth/dto/register.dto';

/*
|--------------------------------------------------------------------------
| AuthController
|--------------------------------------------------------------------------
|
| Handles authentication-related HTTP endpoints.
| Exposes login functionality and delegates logic to AuthService.
|
*/
@Controller('auth')
export class AuthController {
  /*
  |--------------------------------------------------------------------------
  | Constructor
  |--------------------------------------------------------------------------
  |
  | Injects the required services used by the authentication controller.
  |
  | - AuthService     : Handles authentication and registration workflows.
  | - PasswordService : Manages password recovery and reset operations.
  |
  | These services are injected via NestJS dependency injection
  | to keep the controller thin and focused on request handling.
  |
  */
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) {}

  /*
  |--------------------------------------------------------------------------
  | login
  |--------------------------------------------------------------------------
  |
  | Authenticates a user using email and password credentials.
  |
  */
  @UseGuards(AnonymousGuard)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /*
  |--------------------------------------------------------------------------
  | register
  |--------------------------------------------------------------------------
  |
  | Registers a new user using name, email, and password credentials.
  |
  | This endpoint is publicly accessible and intended for
  | initial user onboarding flows.
  |
  */
  @UseGuards(AnonymousGuard)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /*
  |--------------------------------------------------------------------------
  | getMe
  |--------------------------------------------------------------------------
  |
  | Returns the authenticated user's profile
  | extracted directly from the JWT access token.
  |
  */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getMe(@CurrentUser() user: AuthUser) {
    return user;
  }

  /*
  |--------------------------------------------------------------------------
  | forgotPassword
  |--------------------------------------------------------------------------
  |
  | Initiates the password reset process.
  |
  */
  @UseGuards(AnonymousGuard)
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(dto);
  }

  /*
  |--------------------------------------------------------------------------
  | resetPassword
  |--------------------------------------------------------------------------
  |
  | Resets the user password using email and OTP verification.
  |
  */
  @UseGuards(AnonymousGuard)
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.passwordService.resetPassword(dto);
  }

  /*
 |--------------------------------------------------------------------------
 | changePassword
 |--------------------------------------------------------------------------
 |
 | Changes the password of the currently authenticated user.
 |
 | The authenticated user is explicitly passed to the service.
 |
 */
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @CurrentUser() user: AuthUser,
    @Body() dto: ChangePasswordDto,
  ): Promise<SuccessResponse> {
    return await this.passwordService.updatePassword(user, dto);
  }
}
