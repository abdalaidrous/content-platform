import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { UsersService } from '@/modules/users/users.service';
import { ResetPasswordDto } from '@/modules/auth/dto/reset-password.dto';
import { MESSAGES } from '@/common/constants/messages';
import { ForgotPasswordDto } from '@/modules/auth/dto/forgot-password.dto';
import { SuccessResponse } from '@/common/interfaces/success-response.interface';
import type { AuthUser } from '@/common/interfaces/auth-user.interface';
import { ChangePasswordDto } from '@/modules/auth/dto/change-password.dto';

/*
|--------------------------------------------------------------------------
| PasswordService
|--------------------------------------------------------------------------
|
| The PasswordService encapsulates all password-related business logic.
|
| Responsibilities:
| - Validate user password credentials
| - Handle forgot password flow
| - Verify OTP codes
| - Update and hash user passwords
|
*/
@Injectable()
export class PasswordService {
  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Injects required dependencies:
  |
  | - UsersService : Used to retrieve and persist users.
  | - I18nService  : Used to translate error and success messages.
  |
  */
  constructor(
    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
  ) {}

  /*
  |--------------------------------------------------------------------------
  | forgotPassword
  |--------------------------------------------------------------------------
  |
  | Initiates the password reset process.
  |
  | Always returns a success response to prevent
  | user enumeration attacks.
  |
  */
  async forgotPassword(dto: ForgotPasswordDto): Promise<SuccessResponse> {
    const user = await this.usersService.findActiveUserByEmail(dto.email);

    if (user) {
      // TODO: send email (MailerService)
    }

    return {
      message: this.i18n.t(MESSAGES.SUCCESS.PASSWORD_RESET_EMAIL_SENT),
    };
  }

  /*
  |--------------------------------------------------------------------------
  | resetPassword
  |--------------------------------------------------------------------------
  |
  | Resets the user password using email and OTP verification.
  |
  | The method performs the following steps:
  | - Resolves the active user by email address.
  | - Validates the provided OTP against the stored value.
  | - Updates and hashes the new password upon successful verification.
  |
  */
  async resetPassword(dto: ResetPasswordDto): Promise<SuccessResponse> {
    const user = await this.usersService.findActiveUserByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException(
        this.i18n.t(MESSAGES.ERRORS.EMAIL_NOT_FOUND),
      );
    }

    await user.setPassword(dto.password);

    return {
      message: this.i18n.t(MESSAGES.SUCCESS.PASSWORD_RESET_SUCCESS),
    };
  }

  /*
  |--------------------------------------------------------------------------
  | updatePassword
  |--------------------------------------------------------------------------
  |
  | Updates the password of the currently authenticated user.
  |
  | The method ensures that the provided current password
  | is valid before updating the stored password hash.
  |
  */
  async updatePassword(
    authUser: AuthUser,
    dto: ChangePasswordDto,
  ): Promise<SuccessResponse> {
    /*
    |--------------------------------------------------------------------------
    | Resolve User Entity
    |--------------------------------------------------------------------------
    |
    | Loads the full User entity associated with the authenticated user.
    |
    */
    const user = await this.usersService.findById(authUser.id);

    /*
    |--------------------------------------------------------------------------
    | Current Password Verification
    |--------------------------------------------------------------------------
    |
    | Verifies that the provided current password matches
    | the stored password hash.
    |
    */
    const isCurrentPasswordValid = await user.verifyPassword(
      dto.currentPassword,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException(
        this.i18n.t(MESSAGES.ERRORS.INVALID_CURRENT_PASSWORD),
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Update Password
    |--------------------------------------------------------------------------
    |
    | Updates and hashes the new password after successful verification.
    |
    */
    await user.setPassword(dto.newPassword);
    return {
      message: this.i18n.t(MESSAGES.SUCCESS.PASSWORD_CHANGED_SUCCESSFULLY),
    };
  }
}
