import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

/*
|--------------------------------------------------------------------------
| AnonymousGuard
|--------------------------------------------------------------------------
|
| Allows access only to unauthenticated (anonymous) users.
| Prevents requests that already contain an Authorization token.
|
| Usage:
| - Applied to endpoints like login or register.
| - Throws ForbiddenException if a JWT token is present.
|
*/
@Injectable()
export class AnonymousGuard implements CanActivate {
  /*
  |--------------------------------------------------------------------------
  | canActivate
  |--------------------------------------------------------------------------
  |
  | Determines whether the current request is allowed to proceed.
  | Blocks the request if an Authorization header is detected.
  |
  */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (authHeader) {
      throw new ForbiddenException('Already authenticated');
    }

    return true;
  }
}
