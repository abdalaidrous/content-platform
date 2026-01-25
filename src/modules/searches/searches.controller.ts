import { Controller } from '@nestjs/common';

/*
|--------------------------------------------------------------------------
| SearchesController
|--------------------------------------------------------------------------
|
| Exposes endpoints related to search and discovery operations.
|
| This controller acts as an abstraction layer between the core system
| and external search providers (e.g. Elasticsearch).
|
| Responsibilities:
| - Trigger search queries (current or future)
| - Serve discovery-related endpoints
| - Keep the core domain decoupled from any specific search engine
|
| Note:
| Actual indexing operations are expected to be handled asynchronously
| via Job Processing to avoid impacting request performance.
|
*/
@Controller('searches')
export class SearchesController {}