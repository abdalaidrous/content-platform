import { Role } from '@/common/enums/role.enum';

/*
|--------------------------------------------------------------------------
| Role Priority
|--------------------------------------------------------------------------
|
| Defines the priority order of user roles.
| Used to resolve the highest effective role when a user has multiple roles.
|
*/

export const ROLE_PRIORITY: Role[] = [Role.ADMIN, Role.EDITOR, Role.VIEWER];
