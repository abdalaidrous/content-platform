import { UserRole } from '@/modules/users/enums/user-role.enum';
import { AuthProfile } from '@/common/interfaces/auth-profile.interface';

/*
|--------------------------------------------------------------------------
| JwtPayload
|--------------------------------------------------------------------------
|
| Defines the structure of the JSON Web Token payload
| used for authentication.
|
| This interface represents the trusted data encoded
| inside the JWT at login time and decoded during
| request authentication.
|
| Fields:
| - sub   : Unique identifier of the authenticated user.
| - name : User full name.
| - email : User email address.
| - role  : List of roles assigned to the user.
| - profile  : User profile data associated with the user.
|
*/
export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole[];
  profile: AuthProfile;
}
