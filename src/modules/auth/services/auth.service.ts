import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@/modules/users/entities/user.entity';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { MESSAGES } from '@/common/constants/messages';
import { LoginResponse } from '@/modules/auth/interfaces/login-response.interface';
import { TokenService } from '@/modules/auth/services/token.service';
import { UsersService } from '@/modules/users/users.service';

/*
|--------------------------------------------------------------------------
| AuthService
|--------------------------------------------------------------------------
|
| The AuthService encapsulates all authentication-related business logic.
|
| Responsibilities:
| - Validate user credentials (email + password)
| - Generate JSON Web Tokens (JWT)
| - Define the authentication payload structure
|
| This service does NOT:
| - Handle authorization (roles / permissions)
| - Expose HTTP endpoints
| - Perform request validation (handled by DTOs)
|
| Authentication is strictly separated from authorization logic
| to maintain a clean and scalable architecture.
|
*/
@Injectable()
export class AuthService {
  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Injects required dependencies:
  |
  | - UsersService : Used to retrieve users by email.
  | - JwtService   : Used to sign and generate JWT tokens.
  |
  */
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  /*
  |--------------------------------------------------------------------------
  | validateCredentials
  |--------------------------------------------------------------------------
  |
  | Validates user login credentials.
  | Ensures the user exists, is active, and not soft-deleted.
  | Verifies the provided password against the stored hash.
  |
  */
  private async validateCredentials(dto: LoginDto): Promise<User> {
    const user = await this.usersService.findActiveUserByEmail(dto.email);

    if (!user || !(await user.verifyPassword(dto.password))) {
      throw new BadRequestException(MESSAGES.ERRORS.INVALID_CREDENTIALS);
    }

    return user;
  }

  /*
  |--------------------------------------------------------------------------
  | login
  |--------------------------------------------------------------------------
  |
  | Authenticates a user and returns access & refresh tokens.
  |
  */
  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.validateCredentials(dto);
    const accessToken = this.tokenService.generateAccessToken(user);
    return {
      access_token: accessToken.token,
      token_type: 'Bearer',
      expires_in: accessToken.expiresIn,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
