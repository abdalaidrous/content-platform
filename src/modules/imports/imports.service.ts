import { Injectable } from '@nestjs/common';
import { CreateImportJobDto } from './dto/create-import-job.dto';
import { ImportJob } from './entities/import-job.entity';
import { ImportJobStatus } from './enums/import-job-status.enum';

/*
|---------------------------------------------------------------------------
| ImportsService
|---------------------------------------------------------------------------
|
| Handles the lifecycle of content import jobs.
|
*/

@Injectable()
export class ImportsService {
  /*
  |-----------------------------------------------------------------------
  | Create Import Job (Domain Level)
  |-----------------------------------------------------------------------
  |
  | This method prepares an import job without coupling
  | the domain logic to a specific storage or queue.
  |
  */
  createImportJob(dto: CreateImportJobDto): ImportJob {
    return {
      id: crypto.randomUUID(),
      source: dto.source,
      payload: dto.payload,
      status: ImportJobStatus.PENDING,
      createdAt: new Date(),
    };
  }

  /*
  |---------------------------------------------------------------------------
  | markAsProcessing
  |---------------------------------------------------------------------------
  |
  | Moves the import job from PENDING to PROCESSING state.
  | This method ensures that only valid state transitions
  | are allowed during the import lifecycle.
  |
  | @throws Error if the job is not in PENDING state.
  |
  */
  markAsProcessing(job: ImportJob): ImportJob {
    if (job.status !== ImportJobStatus.PENDING) {
      throw new Error('Import job must be pending to start processing.');
    }

    return {
      ...job,
      status: ImportJobStatus.PROCESSING,
    };
  }

  /*
  |---------------------------------------------------------------------------
  | markAsCompleted
  |---------------------------------------------------------------------------
  |
  | Marks the import job as COMPLETED after successful processing.
  | This method can only be called if the job is currently
  | in PROCESSING state.
  |
  | @throws Error if the job is not in PROCESSING state.
  |
  */
  markAsCompleted(job: ImportJob): ImportJob {
    if (job.status !== ImportJobStatus.PROCESSING) {
      throw new Error('Import job must be processing to be completed.');
    }

    return {
      ...job,
      status: ImportJobStatus.COMPLETED,
      processedAt: new Date(),
    };
  }

  /*
  |---------------------------------------------------------------------------
  | markAsFailed
  |---------------------------------------------------------------------------
  |
  | Marks the import job as FAILED when an error occurs
  | during processing.
  |
  | This method prevents completed jobs from being
  | transitioned into a failed state.
  |
  | @param error - Reason for import failure.
  |
  | @throws Error if the job is already completed.
  |
  */
  markAsFailed(job: ImportJob, error: string): ImportJob {
    if (job.status === ImportJobStatus.COMPLETED) {
      throw new Error('Completed import job cannot be marked as failed.');
    }

    return {
      ...job,
      status: ImportJobStatus.FAILED,
      error,
      processedAt: new Date(),
    };
  }
}
