import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { IsNull } from 'typeorm';
import { MESSAGES } from '@/common/constants/messages';
import { I18nService } from 'nestjs-i18n';

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
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  /*
  |--------------------------------------------------------------------------
  | login
  |--------------------------------------------------------------------------
  |
  | Authenticates a user using email and password credentials.
  |
  | Flow:
  | 1. Retrieve the user by email.
  | 2. Compare the provided password with the stored hashed password.
  | 3. Generate a signed JWT token if credentials are valid.
  |
  | Security Notes:
  | - Uses a generic error message for both invalid email and password
  |   to prevent user enumeration attacks.
  | - Password comparison is performed using bcrypt.
  |
  | Throws:
  | - UnauthorizedException if credentials are invalid.
  |
  */
  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateCredentials(dto.email, dto.password);

    const payload: JwtPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

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
  async validateCredentials(email: string, password: string): Promise<User> {
    const user = await this.usersService.userRepo.findOneBy({
      email,
      isActive: true,
      deletedAt: IsNull(),
    });

    if (!user || !(await user.verifyPassword(password))) {
      throw new UnauthorizedException(
        this.i18n.t(MESSAGES.ERRORS.INVALID_CREDENTIALS),
      );
    }

    return user;
  }
}
