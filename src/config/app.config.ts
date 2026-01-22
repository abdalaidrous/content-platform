/*
|---------------------------------------------------------------------------
| appConfig
|---------------------------------------------------------------------------
|
| The appConfig module is responsible for providing core application-level
| configuration values such as the application name, runtime environment,
| and HTTP port.
|
| It reads values from environment variables and applies safe defaults
| when variables are not defined, ensuring predictable behavior across
| different environments (development, test, production).
|
| This configuration is loaded via NestJS ConfigModule and made globally
| available throughout the application.
|
*/
export default () => ({
  app: {
    name: process.env.APP_NAME || 'content-platform',
    port: parseInt(process.env.PORT ?? '3000', 10),
    env: process.env.NODE_ENV || 'development',
  },
});
