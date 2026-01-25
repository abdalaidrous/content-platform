import { Module } from '@nestjs/common';
import { SearchesController } from './searches.controller';
import { SearchesService } from './searches.service';

/*
|--------------------------------------------------------------------------
| SearchesModule
|--------------------------------------------------------------------------
|
| Encapsulates all search and discovery-related logic within the system.
|
| This module is designed to act as a boundary between the core domain
| and external search engines (e.g. Elasticsearch, OpenSearch).
|
| Responsibilities:
| - Expose search-related APIs
| - Coordinate search queries and indexing triggers
| - Maintain low coupling between the system and search providers
|
| The module is future-ready to be extracted into a standalone
| microservice if search requirements grow independently.
|
*/
@Module({
  controllers: [SearchesController],
  providers: [SearchesService],
})
export class SearchesModule {}
