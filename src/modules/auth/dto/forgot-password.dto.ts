import { IsEmail } from 'class-validator';

/*
|--------------------------------------------------------------------------
| ForgotPasswordDto
|--------------------------------------------------------------------------
|
| Defines the payload required to initiate the password reset process.
|
| The user provides their email address, and the system generates
| a password reset token if the account exists.
|
| Security Notes:
| - The response must be generic and should NOT reveal whether
|   the email exists in the system.
|
*/
export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}
