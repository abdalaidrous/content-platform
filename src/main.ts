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
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(app.get(I18nValidationFilter));
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
