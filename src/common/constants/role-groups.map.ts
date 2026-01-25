import { Role } from '@/common/enums/role.enum';

/*
|--------------------------------------------------------------------------
| Role Groups Map
|--------------------------------------------------------------------------
|
| Maps each user role to its allowed serialization groups.
| Used to control which attributes are visible in API responses
| based on the user's effective role.
|
*/
export const ROLE_GROUPS: Record<Role, string[]> = {
  [Role.ADMIN]: ['admin', 'editor', 'user', 'public'],
  [Role.EDITOR]: ['editor', 'user', 'public'],
  [Role.VIEWER]: ['user', 'public'],
};
