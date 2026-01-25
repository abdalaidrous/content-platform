import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { I18nValidationFilter } from '@/common/filters/i18n-validation.filter';

/*
|---------------------------------------------------------------------------
| Application Bootstrap
|---------------------------------------------------------------------------
|
| This file represents the main entry point of the application.
|
| It is responsible for bootstrapping the NestJS application by creating
| the root AppModule, initializing all global modules and providers, and
| starting the HTTP server on the configured port.
|
| The bootstrap function is defined as asynchronous to allow proper
| initialization of dependencies such as configuration, database
| connections, and other async providers before the server starts
| accepting requests.
|
| The returned Promise is intentionally handled using the `void` operator
| to explicitly signal that the application startup is fire-and-forget,
| while still satisfying strict ESLint rules regarding floating promises.
|
*/
async function bootstrap() {
  /*
  |--------------------------------------------------------------------------
  | app
  |--------------------------------------------------------------------------
  |
  | The root NestJS application instance.
  | Uses Fastify as the underlying HTTP server adapter.
  |
  */
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  /*
  |--------------------------------------------------------------------------
  | Global API prefix
  |--------------------------------------------------------------------------
  |
  | Sets a common URL prefix for all HTTP routes.
  | Example: /api/v1/...
  |
  */
  app.setGlobalPrefix('api');

  /*
  |--------------------------------------------------------------------------
  | API versioning
  |--------------------------------------------------------------------------
  |
  | Enables URI-based versioning for all controllers.
  | Example: /v1/resource
  |
  */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  /*
  |--------------------------------------------------------------------------
  | Global validation pipe
  |--------------------------------------------------------------------------
  |
  | Automatically validates and transforms incoming request payloads.
  | - whitelist              : strips unknown properties
  | - transform              : transforms payloads to DTO instances
  | - forbidNonWhitelisted   : throws error for unknown properties
  |
  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  /*
  |--------------------------------------------------------------------------
  | Global exception filters
  |--------------------------------------------------------------------------
  |
  | Registers the i18n-aware validation filter globally
  | to format validation errors with localized messages.
  |
  */
  app.useGlobalFilters(app.get(I18nValidationFilter));

  /*
  |--------------------------------------------------------------------------
  | Application Startup Invocation
  |--------------------------------------------------------------------------
  |
  | Invokes the bootstrap function.
  | The `void` operator is used to explicitly ignore the returned Promise
  | while satisfying strict linting rules.
  |
  */
  await app.listen(process.env.PORT ?? 3000);
}

/*
|---------------------------------------------------------------------------
| Application Startup Invocation
|---------------------------------------------------------------------------
|
| The `void` operator is intentionally used when invoking the bootstrap
| function to explicitly indicate that the returned Promise is
| intentionally not awaited.
|
| This approach satisfies strict ESLint rules (no-floating-promises)
| while clearly documenting that application startup is a fire-and-forget
| operation handled at the process level.
|
*/
void bootstrap();
