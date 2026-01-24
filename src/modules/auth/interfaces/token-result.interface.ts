/*
|--------------------------------------------------------------------------
| TokenResult Interface
|--------------------------------------------------------------------------
|
| Represents the result of a generated JWT token.
|
| Used for both access tokens and refresh tokens to provide
| a consistent and type-safe structure across the auth layer.
|
| Properties:
| - token     : The signed JWT string.
| - expiresIn : Token lifetime in seconds.
|
*/
export interface TokenResult {
  token: string;
  expiresIn: number;
}
