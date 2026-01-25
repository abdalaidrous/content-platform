import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateImportJobDto } from './dto/create-import-job.dto';
import { ImportJob } from './entities/import-job.entity';
import { ImportJobStatus } from './enums/import-job-status.enum';

/*
|--------------------------------------------------------------------------
| ImportsService
|--------------------------------------------------------------------------
|
| Handles the lifecycle and persistence of content import jobs.
|
| This service manages valid state transitions while ensuring
| import jobs are consistently stored and tracked in the database.
|
*/
@Injectable()
export class ImportsService {
  constructor(
    @InjectRepository(ImportJob)
    private readonly importJobRepository: Repository<ImportJob>,
  ) {}

  /*
  |--------------------------------------------------------------------------
  | createImportJob
  |--------------------------------------------------------------------------
  |
  | Creates and persists a new import job in PENDING state.
  |
  */
  async createImportJob(dto: CreateImportJobDto): Promise<ImportJob> {
    const job = this.importJobRepository.create({
      source: dto.source,
      payload: dto.payload,
      status: ImportJobStatus.PENDING,
    });

    return this.importJobRepository.save(job);
  }

  /*
  |--------------------------------------------------------------------------
  | markAsProcessing
  |--------------------------------------------------------------------------
  |
  | Transitions the import job to PROCESSING state.
  |
  */
  async markAsProcessing(job: ImportJob): Promise<ImportJob> {
    if (job.status !== ImportJobStatus.PENDING) {
      throw new Error('Import job must be pending to start processing.');
    }

    job.status = ImportJobStatus.PROCESSING;
    return this.importJobRepository.save(job);
  }

  /*
  |--------------------------------------------------------------------------
  | markAsCompleted
  |--------------------------------------------------------------------------
  |
  | Marks the import job as COMPLETED after successful processing.
  |
  */
  async markAsCompleted(job: ImportJob): Promise<ImportJob> {
    if (job.status !== ImportJobStatus.PROCESSING) {
      throw new Error('Import job must be processing to be completed.');
    }

    job.status = ImportJobStatus.COMPLETED;
    job.processedAt = new Date();

    return this.importJobRepository.save(job);
  }

  /*
  |--------------------------------------------------------------------------
  | markAsFailed
  |--------------------------------------------------------------------------
  |
  | Marks the import job as FAILED when processing fails.
  |
  */
  async markAsFailed(job: ImportJob, error: string): Promise<ImportJob> {
    if (job.status === ImportJobStatus.COMPLETED) {
      throw new Error('Completed import job cannot be marked as failed.');
    }

    job.status = ImportJobStatus.FAILED;
    job.error = error;
    job.processedAt = new Date();

    return this.importJobRepository.save(job);
  }
}
