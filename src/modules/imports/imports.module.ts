import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImportsController } from './imports.controller';
import { ImportsService } from './imports.service';
import { ImportJob } from './entities/import-job.entity';

/*
|--------------------------------------------------------------------------
| ImportsModule
|--------------------------------------------------------------------------
|
| Encapsulates all logic related to importing content
| from external sources into the system.
|
| This module:
| - Exposes internal CMS endpoints for creating import jobs
| - Manages the lifecycle of import operations
| - Acts as a clear boundary between CMS logic
|   and external data integrations
|
*/
@Module({
  /*
  |--------------------------------------------------------------------------
  | imports
  |--------------------------------------------------------------------------
  |
  | Registers ImportJob entity for persistence
  | and repository access within this module.
  |
  */
  imports: [TypeOrmModule.forFeature([ImportJob])],

  /*
  |--------------------------------------------------------------------------
  | controllers
  |--------------------------------------------------------------------------
  |
  | Internal CMS controllers responsible for handling
  | import-related HTTP requests.
  |
  */
  controllers: [ImportsController],

  /*
  |--------------------------------------------------------------------------
  | providers
  |--------------------------------------------------------------------------
  |
  | Domain services responsible for managing
  | import job lifecycle and business rules.
  |
  */
  providers: [ImportsService],

  /*
  |--------------------------------------------------------------------------
  | exports
  |--------------------------------------------------------------------------
  |
  | Expose ImportsService for future usage by:
  | - Background job processors
  | - Schedulers
  | - Other internal modules
  |
  */
  exports: [ImportsService],
})
export class ImportsModule {}
