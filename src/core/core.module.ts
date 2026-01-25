import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import * as redisStore from 'cache-manager-redis-store';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import authConfig from '../config/auth.config';
import i18nConfig from '../config/i18n.config';
import { envValidation } from '@/config/env.validation';
import { DatabaseModule } from '@/database/database.module';
import { I18nValidationFilter } from '@/common/filters/i18n-validation.filter';
import { UserContextService } from '@/common/services/user-context.service';
import { UserContextMiddleware } from '@/common/middlewares/user-context.middleware';
import cacheConfig from '@/config/cache.config';
import { CacheModule } from '@nestjs/cache-manager';

/*
|---------------------------------------------------------------------------
| CoreModule
|---------------------------------------------------------------------------
|
| The CoreModule is responsible for configuring and providing
| global, cross-cutting infrastructure concerns that are shared
| across the entire application.
|
| This includes:
| - Centralized configuration management via ConfigModule
| - Environment variable validation and loading
| - Internationalization (i18n) setup
| - Database initialization
| - Global request-scoped services and filters
|
| This module is imported once at the root level of the application
| and must remain free of feature-specific controllers or
| business logic to preserve a clean and scalable architecture.
|
*/
@Global()
@Module({
  imports: [
    /*
    |-----------------------------------------------------------------------
    | ConfigModule
    |-----------------------------------------------------------------------
    |
    | Loads and validates environment-based configuration values
    | and exposes them globally across the application.
    |
    */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, cacheConfig],
      validationSchema: envValidation,
    }),

    /*
    |-----------------------------------------------------------------------
    | CacheModule
    |-----------------------------------------------------------------------
    |
    | Registers Redis as a global distributed cache layer using
    | the Cache Aside pattern to reduce database load and improve
    | response times under high traffic.
    |
    | The cache is configured asynchronously to allow dynamic
    | resolution of connection details via ConfigService.
    |
    */
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        host: config.get<string>('cache.host'),
        port: config.get<number>('cache.port'),
        ttl: config.get<number>('cache.ttl'),
      }),
    }),

    /*
    |-----------------------------------------------------------------------
    | I18nModule
    |-----------------------------------------------------------------------
    |
    | Configures internationalization support for request-level
    | language resolution and validation messaging.
    |
    */
    I18nModule.forRoot(i18nConfig()),

    /*
    |-----------------------------------------------------------------------
    | DatabaseModule
    |-----------------------------------------------------------------------
    |
    | Provides centralized database initialization and shared
    | data access configuration for the application.
    |
    */
    DatabaseModule,
  ],
  providers: [I18nValidationFilter, UserContextService],
  exports: [UserContextService],
})
export class CoreModule {
  /*
  |--------------------------------------------------------------------------
  | configure
  |--------------------------------------------------------------------------
  |
  | Registers global middleware applied to all routes.
  |
  | The UserContextMiddleware populates the request-scoped
  | UserContextService with the authenticated user.
  |
  */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserContextMiddleware).forRoutes('*');
  }
}
