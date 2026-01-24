import { Controller, Post, Body, UseGuards } from '@nestjs/common';

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
