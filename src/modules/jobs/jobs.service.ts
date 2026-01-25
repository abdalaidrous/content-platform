import { Injectable } from '@nestjs/common';

/*
|--------------------------------------------------------------------------
| JobsService
|--------------------------------------------------------------------------
|
| Handles the lifecycle and orchestration of background jobs.
|
| This service abstracts job creation and state transitions,
| allowing the system to trigger background tasks without
| coupling to a specific queue or execution engine.
|
*/
@Injectable()
export class JobsService {}
