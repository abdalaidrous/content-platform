import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';

/*
|--------------------------------------------------------------------------
| JobsModule
|--------------------------------------------------------------------------
|
| Encapsulates all background job processing logic within the system.
|
| This module is responsible for:
| - Managing asynchronous and long-running tasks
| - Tracking job execution state and lifecycle
| - Decoupling heavy operations from HTTP request flow
|
| Jobs handled by this module may include:
| - Content imports
| - Search indexing
| - Email notifications
|
| The module is designed to be easily integrated with
| external queue systems (e.g. BullMQ, SQS) in the future.
|
*/
@Module({
  /*
  |--------------------------------------------------------------------------
  | imports
  |--------------------------------------------------------------------------
  |
  | Registers Job entity for persistence and lifecycle tracking.
  |
  */
  imports: [TypeOrmModule.forFeature([Job])],

  /*
  |--------------------------------------------------------------------------
  | controllers
  |--------------------------------------------------------------------------
  |
  | Internal controllers used mainly for monitoring
  | and administrative job operations.
  |
  */
  controllers: [JobsController],

  /*
  |--------------------------------------------------------------------------
  | providers
  |--------------------------------------------------------------------------
  |
  | Core services responsible for job creation,
  | execution state transitions, and retries.
  |
  */
  providers: [JobsService],

  /*
  |--------------------------------------------------------------------------
  | exports
  |--------------------------------------------------------------------------
  |
  | Expose JobsService for usage by:
  | - Imports module
  | - Search module
  | - Future background workers
  |
  */
  exports: [JobsService],
})
export class JobsModule {}
