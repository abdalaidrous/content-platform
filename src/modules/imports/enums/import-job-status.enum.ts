/*
|---------------------------------------------------------------------------
| ImportJobStatus
|---------------------------------------------------------------------------
|
| Defines the lifecycle states of an import job.
|
*/

export enum ImportJobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
