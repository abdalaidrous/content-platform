import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import { envValidation } from './config/env.validation';

/*
|---------------------------------------------------------------------------
| AppModule
|---------------------------------------------------------------------------
|
| The AppModule is the root module of the application and serves as the main
| entry point for configuring global application dependencies.
|
| It initializes the NestJS ConfigModule with global scope, loads all
| application configuration sources (app, database, and authentication),
| and applies environment variable validation at startup to ensure the
| application fails fast in case of misconfiguration.
|
| This module acts as the foundation upon which all other application
| modules are composed.
|
*/
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      validationSchema: envValidation,
    }),
  ],
})
export class AppModule {}
