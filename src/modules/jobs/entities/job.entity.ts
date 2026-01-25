import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';

/*
|--------------------------------------------------------------------------
| Job
|--------------------------------------------------------------------------
|
| Represents a background job executed asynchronously.
|
| This entity is used to track long-running or non-blocking operations
| such as imports, search indexing, and email notifications.
|
| It acts as a persistence layer for job state, allowing monitoring,
| retries, and failure handling without coupling the system to
| a specific queue implementation.
|
*/
@Entity('jobs')
export class Job extends BaseEntity {
  /*
  |--------------------------------------------------------------------------
  | type
  |--------------------------------------------------------------------------
  |
  | Logical job type (e.g. import, search_index, email).
  |
  */
  @Column()
  type: string;

  /*
  |--------------------------------------------------------------------------
  | status
  |--------------------------------------------------------------------------
  |
  | Current execution status of the job.
  | (e.g. pending, processing, completed, failed)
  |
  */
  @Column()
  status: string;

  /*
  |--------------------------------------------------------------------------
  | payload
  |--------------------------------------------------------------------------
  |
  | Arbitrary data required to execute the job.
  | Stored as JSON to support multiple job types.
  |
  */
  @Column({ type: 'jsonb' })
  payload: Record<string, any>;

  /*
  |--------------------------------------------------------------------------
  | error
  |--------------------------------------------------------------------------
  |
  | Error message in case the job fails.
  |
  */
  @Column({ type: 'text', nullable: true })
  error?: string;

  /*
  |--------------------------------------------------------------------------
  | processedAt
  |--------------------------------------------------------------------------
  |
  | Timestamp when the job was processed.
  |
  */
  @Column({ type: 'timestamp', nullable: true })
  processedAt?: Date;
}
