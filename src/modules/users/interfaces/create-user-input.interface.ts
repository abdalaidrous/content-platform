import { UserRole } from '@/modules/users/enums/user-role.enum';

/*
|--------------------------------------------------------------------------
| CreateUserInput
|--------------------------------------------------------------------------
|
| Defines the required input payload for creating a user
| within the User domain.
|
| The role property is optional and will default to USER
| when not explicitly provided.
|
*/

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
