import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';

/*
|--------------------------------------------------------------------------
| SearchIndex
|--------------------------------------------------------------------------
|
| Represents a searchable reference for entities indexed in an external
| search engine (e.g. Elasticsearch).
|
| This entity does NOT store searchable content itself.
| Instead, it tracks indexing state and metadata to keep the core system
| decoupled from any specific search provider.
|
| This design supports:
| - Low Coupling with external search systems
| - Easy replacement or extension of search engines
| - Asynchronous indexing via Job Processing
|
| Typical indexed entities:
| - Program
| - Episode
| - Category
|
*/
@Entity('search_indexes')
export class SearchIndex extends BaseEntity {
  /*
  |--------------------------------------------------------------------------
  | entityType
  |--------------------------------------------------------------------------
  |
  | Indicates the type of the indexed entity (e.g. program, episode).
  |
  */
  @Column()
  entityType: string;

  /*
  |--------------------------------------------------------------------------
  | entityId
  |--------------------------------------------------------------------------
  |
  | References the primary key of the indexed entity.
  |
  */
  @Column()
  entityId: number;

  /*
  |--------------------------------------------------------------------------
  | indexedAt
  |--------------------------------------------------------------------------
  |
  | Timestamp of the last successful indexing operation.
  |
  */
  @Column({ type: 'timestamp', nullable: true })
  indexedAt?: Date;
}
