import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_READ_KEY } from '@/common/decorators/public-read.decorator';
import { AuthUser } from '@/common/interfaces/auth-user.interface';
import { FastifyRequest } from 'fastify';

/*
|--------------------------------------------------------------------------
| JwtAuthGuard
|--------------------------------------------------------------------------
|
| Authentication guard responsible for validating JWT tokens.
|
| This guard supports three access modes:
| - Public routes        : Fully accessible without authentication.
| - Public read routes   : Allow unauthenticated GET requests only.
| - Protected routes     : Require a valid JWT token.
|
*/
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    /*
    |--------------------------------------------------------------------------
    | request
    |--------------------------------------------------------------------------
    |
    | The current HTTP request object.
    | Used to determine the request method (GET, POST, etc.).
    |
    */
    const request = context
      .switchToHttp()
      .getRequest<FastifyRequest & { user?: AuthUser }>();

    /*
    |--------------------------------------------------------------------------
    | isPublicRead
    |--------------------------------------------------------------------------
    |
    | Indicates whether the current route allows public read access.
    | When enabled, unauthenticated GET requests are allowed.
    |
    */
    const isPublicRead = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_READ_KEY,
      [context.getHandler(), context.getClass()],
    );

    /*
    |--------------------------------------------------------------------------
    | Public read access check
    |--------------------------------------------------------------------------
    |
    | Allows unauthenticated access only for GET requests
    | when the route is explicitly marked as PublicRead.
    |
    */
    const authHeader = request.headers.authorization;

    if (isPublicRead && request.method === 'GET' && !authHeader) {
      return true;
    }

    /*
    |--------------------------------------------------------------------------
    | Default authentication flow
    |--------------------------------------------------------------------------
    |
    | Falls back to the standard JWT authentication strategy
    | for protected routes.
    |
    */
    return super.canActivate(context);
  }
}
