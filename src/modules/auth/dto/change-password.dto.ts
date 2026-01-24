import { IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from '@/common/validators/match.validator';

/*
|--------------------------------------------------------------------------
| ChangePasswordDto
|--------------------------------------------------------------------------
|
| Data Transfer Object used to validate change password requests
| for authenticated users.
|
*/
export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @IsString()
  @MinLength(8)
  newPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Match('newPassword', { message: 'errors.PASSWORD_CONFIRMATION_MISMATCH' })
  confirmNewPassword: string;
}
