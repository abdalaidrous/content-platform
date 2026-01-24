import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from '@/common/validators/match.validator';

/*
|--------------------------------------------------------------------------
| ResetPasswordDto
|--------------------------------------------------------------------------
|
| Resets user password using email and OTP verification.
|
*/
export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  otp: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Match('password', { message: 'errors.PASSWORD_CONFIRMATION_MISMATCH' })
  confirmPassword: string;
}
