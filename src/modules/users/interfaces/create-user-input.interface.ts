import { UserRole } from '@/modules/users/enums/user-role.enum';
import { Gender } from '@/modules/users/enums/gender.enum';

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
| The profile object contains optional, presentation-related
| user information and is created alongside the user.
|
*/
export interface CreateUserInput {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: UserRole;

  /*
  |--------------------------------------------------------------------------
  | profile
  |--------------------------------------------------------------------------
  |
  | Optional profile data associated with the user.
  | This includes non-authentication and privacy-sensitive
  | attributes such as locale, gender, avatar, and bio.
  |
  */
  profile?: {
    locale?: string;
    gender?: Gender;
    avatar?: string;
    bio?: string;
  };
}
