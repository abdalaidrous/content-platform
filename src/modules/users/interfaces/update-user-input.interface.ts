import { Gender } from '@/modules/users/enums/gender.enum';

/*
|--------------------------------------------------------------------------
| UpdateUserInput
|--------------------------------------------------------------------------
|
| Defines the input payload used to update an existing user.
|
| All properties are optional to support partial updates.
| This interface is used at the application/service layer
| and represents business intent rather than HTTP validation.
|
| Authentication-sensitive attributes (such as password
| and role) are intentionally excluded and handled through
| dedicated workflows.
|
*/

export interface UpdateUserInput {
  name?: string;
  email?: string;
  phone?: string;

  /*
  |--------------------------------------------------------------------------
  | profile
  |--------------------------------------------------------------------------
  |
  | Optional profile data associated with the user.
  |
  | This section contains non-authentication and
  | non-authorization related attributes, such as
  | localization and presentation preferences.
  |
  */
  profile?: {
    locale?: string;
    gender?: Gender;
    avatar?: string;
    bio?: string;
  };
}
