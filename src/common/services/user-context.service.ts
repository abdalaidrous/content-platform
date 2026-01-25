import { Injectable, Scope } from '@nestjs/common';
import { AuthUser } from '@/common/interfaces/auth-user.interface';
import { Role } from '@/common/enums/role.enum';

/*
|---------------------------------------------------------------------------
| UserContextService
|---------------------------------------------------------------------------
|
| Request-scoped service that stores the authenticated user
| for the duration of a single HTTP request.
|
| The user context is optional by design to support
| unauthenticated (public) requests safely.
|
*/
@Injectable({ scope: Scope.REQUEST })
export class UserContextService {
  private user: AuthUser | null = null;

  /*
  |---------------------------------------------------------------------------
  | setUser
  |---------------------------------------------------------------------------
  |
  | Assigns the authenticated user to the current request context.
  |
  */
  setUser(user: AuthUser): void {
    this.user = user;
  }

  /*
  |---------------------------------------------------------------------------
  | getUser
  |---------------------------------------------------------------------------
  |
  | Returns the authenticated user if present,
  | or null for unauthenticated requests.
  |
  */
  getUser(): AuthUser | null {
    return this.user;
  }

  /*
  |---------------------------------------------------------------------------
  | isAuthenticated
  |---------------------------------------------------------------------------
  |
  | Indicates whether the current request
  | is associated with an authenticated user.
  |
  */
  isAuthenticated(): boolean {
    return !!this.user;
  }

  /*
  |--------------------------------------------------------------------------
  | isAdmin
  |--------------------------------------------------------------------------
  |
  | Checks whether the user has the ADMIN role.
  |
  */
  isAdmin(): boolean {
    return this.user?.role.includes(Role.ADMIN) ?? false;
  }

  /*
  |--------------------------------------------------------------------------
  | isEditor
  |--------------------------------------------------------------------------
  |
  | Checks whether the user has the EDITOR role.
  |
  */
  isEditor(): boolean {
    return this.user?.role.includes(Role.EDITOR) ?? false;
  }

  /*
  |--------------------------------------------------------------------------
  | isViewer
  |--------------------------------------------------------------------------
  |
  | Checks whether the user has the VIEWER role.
  |
  */
  isViewer(): boolean {
    return this.user?.role.includes(Role.VIEWER) ?? false;
  }

  /*
  |---------------------------------------------------------------------------
  | getUserId
  |---------------------------------------------------------------------------
  |
  | Returns the authenticated user's ID if available.
  |
  */
  getUserId(): string | null {
    return this.user?.id ?? null;
  }
}
