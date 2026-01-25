import { SetMetadata } from '@nestjs/common';
import { Role } from '@/common/enums/role.enum';

/*
|---------------------------------------------------------------------------
| ROLES_KEY
|---------------------------------------------------------------------------
|
| Metadata key used to store required roles on routes and controllers.
| This key is later read by the RolesGuard via the Reflector.
|
*/
export const ROLES_KEY = 'roles';

/*
|---------------------------------------------------------------------------
| Roles Decorator
|---------------------------------------------------------------------------
|
| Attaches allowed user roles to the route handler or controller.
| The RolesGuard reads this metadata to enforce role-based access control.
|
*/
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
