import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

/*
|--------------------------------------------------------------------------
| LoginDto
|--------------------------------------------------------------------------
|
| The LoginDto defines the payload required to authenticate a user
| within the system.
|
| It is used exclusively by the authentication layer to validate
| incoming login requests before attempting credential verification.
|
| Validation Rules:
| - email    : Must be a valid email address associated with an existing user.
| - password : Must be a non-empty string representing the user's password.
|
| This DTO is intentionally minimal and contains no business logic.
| Credential verification, password hashing comparison, and token
| generation are handled by the AuthService.
|
*/
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}
