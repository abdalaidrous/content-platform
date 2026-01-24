/*
|--------------------------------------------------------------------------
| AuthProfile
|--------------------------------------------------------------------------
|
| Represents a lightweight snapshot of the user's profile
| embedded within the authentication token payload.
|
*/
export interface AuthProfile {
  avatar?: string;
  bio?: string;
  locale: string;
  gender?: string;
}
