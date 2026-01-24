import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/*
|--------------------------------------------------------------------------
| JwtAuthGuard
|--------------------------------------------------------------------------
|
| Authentication guard responsible for protecting routes
| using JSON Web Token (JWT) authentication strategy.
|
| This guard delegates the authentication process to the
| Passport `jwt` strategy, which:
| - Extracts the token from the Authorization header
| - Validates the token signature and payload
| - Attaches the authenticated user to the request object
|
| Routes protected by this guard require a valid JWT token.
|
*/
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
