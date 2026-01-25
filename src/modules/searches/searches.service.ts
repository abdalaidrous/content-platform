import { Injectable } from '@nestjs/common';

/*
|--------------------------------------------------------------------------
| SearchesService
|--------------------------------------------------------------------------
|
| Contains the core business logic related to search and discovery.
|
| This service is responsible for coordinating search operations
| and preparing data for external search providers when needed.
|
| The actual indexing and synchronization processes are expected
| to be handled asynchronously via background jobs to keep
| request handling fast and decoupled.
|
*/
@Injectable()
export class SearchesService {}