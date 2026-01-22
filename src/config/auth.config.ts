/*
|---------------------------------------------------------------------------
| authConfig
|---------------------------------------------------------------------------
|
| The authConfig module defines authentication-related configuration values
| used across the application, specifically for JWT-based authentication.
|
| It provides the JWT secret key used to sign tokens and the token expiration
| duration, both sourced from environment variables to ensure security
| and flexibility across different environments.
|
| This configuration is loaded through NestJS ConfigModule and consumed
| by authentication services, strategies, and guards.
|
*/
export default () => ({
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
});
