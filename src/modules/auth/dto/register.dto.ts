import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '@/common/validators/match.validator';

/*
|--------------------------------------------------------------------------
| RegisterDto
|--------------------------------------------------------------------------
|
| The RegisterDto defines the payload required to register
| a new user within the system.
|
| It is used by the authentication layer to validate
| incoming registration requests before creating
| a new user record.
|
| Validation Rules:
| - name     : Required, non-empty string, max 100 characters.
| - email    : Required, valid email address, max 255 characters.
| - password : Required string, minimum 8 and maximum 72 characters.
|
| This DTO is intentionally focused on input validation only.
| Business logic such as password hashing, user persistence,
| and post-registration actions (e.g. sending verification emails)
| are handled by the AuthService.
|
*/
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  @Match('password', { message: 'errors.PASSWORD_CONFIRMATION_MISMATCH' })
  confirmNewPassword: string;
}
