import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Role } from '@/common/enums/role.enum';
import { ROLES_KEY } from '@/common/decorators/roles.decorator';
import { IS_PUBLIC_READ_KEY } from '@/common/decorators/public-read.decorator';
import { AuthUser } from '@/common/interfaces/auth-user.interface';

/*
|---------------------------------------------------------------------------
| RolesGuard
|---------------------------------------------------------------------------
|
| Enforces role-based access control (RBAC) for HTTP requests.
|
| This guard reads allowed roles from metadata defined via the @Roles()
| decorator and compares them against the authenticated user's role.
|
| Responsibilities:
| - Ensure the request is authenticated
| - Verify the user role matches one of the allowed roles
|
| Notes:
| - Authentication is handled by a separate AuthGuard (e.g. JWT)
| - Fine-grained authorization should be implemented via policies
|   or a permission-based system
|
*/
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /*
  |---------------------------------------------------------------------------
  | canActivate
  |---------------------------------------------------------------------------
  |
  | Determines whether the current request is authorized based on
  | the user's role and the roles required by the route.
  |
  */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // No role restrictions defined → allow access
    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthUser }>();

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
    if (isPublicRead && request.method === 'GET') {
      return true;
    }

    const user = request.user;

    // Must be authenticated
    if (!user || !Array.isArray(user.role)) {
      return false;
    }

    // User has at least one required role
    return requiredRoles.some((role) => user.role.includes(role));
  }
}
