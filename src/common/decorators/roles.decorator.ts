import { SetMetadata } from '@nestjs/common';
import { Role } from '@/common/enums/role.enum';

/*
|---------------------------------------------------------------------------
| Roles Decorator
|---------------------------------------------------------------------------
|
| Attaches allowed user roles to the route handler or controller.
| The RolesGuard reads this metadata to enforce role-based access control.
|
*/
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
