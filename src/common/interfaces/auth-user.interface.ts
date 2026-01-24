/*
|--------------------------------------------------------------------------
| AuthUser
|--------------------------------------------------------------------------
|
| Represents the authenticated user object extracted from
| the validated JWT payload and attached to the request.
|
*/
export interface AuthUser {
  id: string;
  email: string;
  role: string;
}