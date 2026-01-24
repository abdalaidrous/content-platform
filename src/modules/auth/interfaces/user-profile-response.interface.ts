import { AuthProfile } from '@/common/interfaces/auth-profile.interface';

/*
|--------------------------------------------------------------------------
| UserProfileResponse
|--------------------------------------------------------------------------
|
| Defines the response structure returned when fetching
| the authenticated user's profile information.
|
| This interface represents a read-only projection of the
| User aggregate, exposing only public and safe fields.
|
*/
export interface UserProfileResponse {
  /*
  |--------------------------------------------------------------------------
  | User Identity
  |--------------------------------------------------------------------------
  */
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string[];
  profile?: AuthProfile;
}
