import { ImportJobStatus } from '@/modules/imports/enums/import-job-status.enum';
import { ImportSource } from '@/modules/imports/enums/import-source.enum';

/*
|---------------------------------------------------------------------------
| ImportJob
|---------------------------------------------------------------------------
|
| Represents a content import job from an external source.
| This entity tracks the lifecycle of an import operation.
|
*/
export class ImportJob {
  /*
  |---------------------------------------------------------------------------
  | id
  |---------------------------------------------------------------------------
  |
  | Unique identifier for the import job.
  |
  */
  id: string;

  /*
  |---------------------------------------------------------------------------
  | source
  |---------------------------------------------------------------------------
  |
  | External source from which the content will be imported.
  |
  */
  source: ImportSource;

  /*
  |---------------------------------------------------------------------------
  | payload
  |---------------------------------------------------------------------------
  |
  | Raw payload required to fetch and normalize external content.
  | The structure depends on the selected import source.
  |
  */
  payload: Record<string, any>;

  /*
  |---------------------------------------------------------------------------
  | status
  |---------------------------------------------------------------------------
  |
  | Current lifecycle status of the import job.
  |
  */
  status: ImportJobStatus;

  /*
  |---------------------------------------------------------------------------
  | error
  |---------------------------------------------------------------------------
  |
  | Error message in case the import job fails.
  |
  */
  error?: string;

  /*
  |---------------------------------------------------------------------------
  | createdAt
  |---------------------------------------------------------------------------
  |
  | Timestamp when the import job was created.
  |
  */
  createdAt: Date;

  /*
  |---------------------------------------------------------------------------
  | processedAt
  |---------------------------------------------------------------------------
  |
  | Timestamp when the import job was processed.
  |
  */
  processedAt?: Date;
}
