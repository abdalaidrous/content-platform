import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@/modules/auth/interfaces/jwt-payload.interface';

/*
|--------------------------------------------------------------------------
| JwtStrategy
|--------------------------------------------------------------------------
|
| Handles authentication by validating JSON Web Tokens (JWT).
|
| This strategy:
| - Extracts the token from the Authorization header (Bearer <token>)
| - Verifies the token signature using a secret key
| - Decodes the token payload
| - Attaches the authenticated user to request.user
|
| This strategy is responsible ONLY for authentication.
| Authorization (roles / permissions) is handled separately.
|
*/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Injects ConfigService to safely retrieve environment variables.
  |
  | Using ConfigService ensures:
  | - Strong typing
  | - No undefined values
  | - Fail-fast behavior if configuration is missing
  |
  */
  constructor(private readonly configService: ConfigService) {
    super({
      /*
      |----------------------------------------------------------------------
      | jwtFromRequest
      |----------------------------------------------------------------------
      |
      | Specifies how the JWT is extracted from incoming requests.
      | In this case, it expects the token to be provided as:
      |
      | Authorization: Bearer <token>
      |
      */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      /*
      |----------------------------------------------------------------------
      | secretOrKey
      |----------------------------------------------------------------------
      |
      | Secret key used to verify the JWT signature.
      | Retrieved safely from environment variables via ConfigService.
      |
      | If the key is missing, the application will fail at startup
      | instead of crashing at runtime.
      |
      */
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),

      /*
      |----------------------------------------------------------------------
      | ignoreExpiration
      |----------------------------------------------------------------------
      |
      | Ensures expired tokens are rejected automatically.
      |
      */
      ignoreExpiration: false,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | validate
  |--------------------------------------------------------------------------
  |
  | Invoked automatically after the JWT has been successfully verified.
  |
  | The returned object is attached to the request as `request.user`
  | and is accessible in controllers, guards, and interceptors.
  |
  | Expected payload structure:
  | {
  |   sub: number;        // User ID
  |   email: string;     // User email
  |   role: UserRole[];  // Assigned user roles
  | }
  |
  | IMPORTANT:
  | - Do NOT perform database queries here
  | - Keep this method lightweight
  |
  */
  validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      profile: payload.profile,
    };
  }
}
