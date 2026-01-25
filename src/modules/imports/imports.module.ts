import { Module } from '@nestjs/common';
import { ImportsController } from './imports.controller';
import { ImportsService } from './imports.service';

/*
|---------------------------------------------------------------------------
| ImportsModule
|---------------------------------------------------------------------------
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
  |---------------------------------------------------------------------------
  | controllers
  |---------------------------------------------------------------------------
  |
  | Internal CMS controllers responsible for handling
  | import-related HTTP requests.
  |
  */
  controllers: [ImportsController],

  /*
  |---------------------------------------------------------------------------
  | providers
  |---------------------------------------------------------------------------
  |
  | Domain services responsible for managing
  | import job lifecycle and business rules.
  |
  */
  providers: [ImportsService],

  /*
  |---------------------------------------------------------------------------
  | exports
  |---------------------------------------------------------------------------
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
