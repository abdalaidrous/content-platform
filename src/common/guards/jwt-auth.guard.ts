import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_READ_KEY } from '@/common/decorators/public-read.decorator';
import { AuthUser } from '@/common/interfaces/auth-user.interface';
import { FastifyRequest } from 'fastify';
import { UserContextService } from '@/common/services/user-context.service';

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

  /*
  |---------------------------------------------------------------------------
  | Constructor
  |---------------------------------------------------------------------------
  |
  | Injects framework and application-level dependencies required
  | to evaluate route metadata and populate the request-scoped
  | user context after successful authentication.
  |
  */
  constructor(
    private readonly reflector: Reflector,
    private readonly userContext: UserContextService,
  ) {
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

  /*
  |---------------------------------------------------------------------------
  | handleRequest
  |---------------------------------------------------------------------------
  |
  | Called by Passport after successful JWT validation.
  |
  | This is the earliest and safest point where the
  | authenticated user is available.
  |
  */
  handleRequest(err: any, user: any, _info: any, _context: ExecutionContext, _status?: any): any {
    if (user) {
      this.userContext.setUser(user as AuthUser);
    }

    return user;
  }
}
