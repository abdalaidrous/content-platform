import { Injectable, Scope } from '@nestjs/common';
import { AuthUser } from '@/common/interfaces/auth-user.interface';

/*
|--------------------------------------------------------------------------
| UserContextService
|--------------------------------------------------------------------------
|
| Request-scoped service that stores the authenticated user
| for the duration of a single HTTP request.
|
| This service acts as a centralized access point for the
| current user, preventing the need to pass user identifiers
| or objects through multiple application layers.
|
*/
@Injectable({ scope: Scope.REQUEST })
export class UserContextService {
  /*
  |--------------------------------------------------------------------------
  | user
  |--------------------------------------------------------------------------
  |
  | Internal reference to the authenticated user associated
  | with the current request lifecycle.
  |
  | This value is populated once by middleware after the
  | authentication guard succeeds.
  |
  */
  private user: AuthUser | null = null;

  /*
  |--------------------------------------------------------------------------
  | setUser
  |--------------------------------------------------------------------------
  |
  | Assigns the authenticated user to the current request
  | context.
  |
  | This method is intended to be called exactly once per
  | request by the UserContextMiddleware after successful
  | authentication.
  |
  */
  setUser(user: AuthUser): void {
    this.user = user;
  }

  /*
  |--------------------------------------------------------------------------
  | getUser
  |--------------------------------------------------------------------------
  |
  | Retrieves the authenticated user from the request context.
  |
  | Throws an error if accessed before the user has been
  | initialized, indicating an invalid access order or
  | a missing authentication guard.
  |
  */
  getUser(): AuthUser {
    if (!this.user) {
      throw new Error('UserContext not initialized');
    }

    return this.user;
  }

  /*
  |--------------------------------------------------------------------------
  | getUserId
  |--------------------------------------------------------------------------
  |
  | Convenience method for retrieving the authenticated
  | user's unique identifier.
  |
  | Useful for application services that only require
  | the user ID without accessing the full user object.
  |
  */
  getUserId(): string {
    return this.getUser().id;
  }
}
