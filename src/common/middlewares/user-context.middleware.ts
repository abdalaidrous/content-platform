import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UserContextService } from '@/common/services/user-context.service';
import { AuthUser } from '@/common/interfaces/auth-user.interface';

/*
|--------------------------------------------------------------------------
| UserContextMiddleware
|--------------------------------------------------------------------------
|
| Middleware responsible for populating the UserContextService
| with the authenticated user extracted from the request.
|
| This middleware runs once per HTTP request and bridges the gap
| between the authentication layer (JWT strategy) and the
| application layer (request-scoped services).
|
*/
@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  /*
  |--------------------------------------------------------------------------
  | Constructor
  |--------------------------------------------------------------------------
  |
  | Injects the request-scoped UserContextService which stores
  | the authenticated user for the duration of the request.
  |
  */
  constructor(private readonly userContext: UserContextService) {}

  /*
  |--------------------------------------------------------------------------
  | use
  |--------------------------------------------------------------------------
  |
  | Middleware execution method invoked by NestJS during the
  | HTTP request lifecycle.
  |
  | If an authenticated user is present on the request object
  | (attached by the JWT strategy), it is stored in the
  | UserContextService for downstream access.
  |
  */
  use(
    req: FastifyRequest & { user?: AuthUser },
    _: FastifyReply,
    next: () => void,
  ): void {
    /*
    |----------------------------------------------------------------------
    | User Extraction
    |----------------------------------------------------------------------
    |
    | Reads the authenticated user from the request object.
    | The user is expected to be present only after a successful
    | authentication guard execution.
    |
    */
    if (req.user) {
      this.userContext.setUser(req.user);
    }

    /*
    |----------------------------------------------------------------------
    | Continue Request Pipeline
    |----------------------------------------------------------------------
    |
    | Passes control to the next middleware or request handler
    | in the processing chain.
    |
    */
    next();
  }
}
