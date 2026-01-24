/*
|--------------------------------------------------------------------------
| LoginResponse
|--------------------------------------------------------------------------
|
| Represents the response returned after a successful authentication.
|
| This interface defines the structure of the JWT login response
| sent to the client, containing the access token and its metadata.
|
| Fields:
| - access_token : A signed JWT used to authenticate subsequent requests.
| - token_type   : The authentication scheme used for the token.
|                  Always "Bearer" for JWT-based authentication.
| - expires_in   : Token expiration time in seconds.
|
| This response is consumed by frontend or client applications
| to store the token and attach it to the Authorization header:
|
| Authorization: Bearer <access_token>
|
*/
export interface LoginResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  user: any;
}
