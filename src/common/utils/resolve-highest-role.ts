import { Role } from '@/common/enums/role.enum';
import { ROLE_PRIORITY } from '@/common/constants/role-priority';

/*
|--------------------------------------------------------------------------
| resolveHighestRole
|--------------------------------------------------------------------------
|
| Resolves the highest-priority role from a list of user roles.
| Used to determine the effective role for authorization and visibility.
|
*/
export function resolveHighestRole(roles: Role[] | undefined): Role | null {
  if (!roles || roles.length === 0) {
    return null;
  }

  return ROLE_PRIORITY.find((role) => roles.includes(role)) ?? null;
}
