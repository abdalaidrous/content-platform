import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

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
  constructor(private readonly authService: AuthService) {}

  /*
  |--------------------------------------------------------------------------
  | login
  |--------------------------------------------------------------------------
  |
  | Authenticates a user using email and password credentials.
  |
  */
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
