import * as Joi from 'joi';

/*
|---------------------------------------------------------------------------
| envValidation
|---------------------------------------------------------------------------
|
| The envValidation schema defines and validates all required environment
| variables needed for the application to start correctly.
|
| It ensures that critical configuration values such as application
| environment, server port, database credentials, and authentication
| secrets are present and correctly formatted before the application
| boots, preventing runtime failures caused by misconfiguration.
|
| This schema is used by NestJS ConfigModule at startup time to fail fast
| and provide clear error messages when environment variables are missing
| or invalid.
|
*/
export const envValidation: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
  PORT: Joi.number().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),
});
