import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';

import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import authConfig from '../config/auth.config';
import i18nConfig from '../config/i18n.config';
import { envValidation } from '@/config/env.validation';
import { DatabaseModule } from '@/database/database.module';

/*
|--------------------------------------------------------------------------
| CoreModule
|--------------------------------------------------------------------------
|
| Provides and configures global, cross-cutting application concerns
| such as configuration management, internationalization (i18n),
| and other shared infrastructure services.
|
| This module is imported once at the root level and should not
| contain feature-specific controllers or business logic.
|
*/
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      validationSchema: envValidation,
    }),
    I18nModule.forRoot(i18nConfig()),
    DatabaseModule,
  ],
})
export class CoreModule {}
