import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';
import { ImportSource } from '../enums/import-source.enum';

/*
|---------------------------------------------------------------------------
| CreateImportJobDto
|---------------------------------------------------------------------------
|
| Defines the payload required to create a new import job.
| Validation rules ensure only supported sources are accepted.
|
*/

export class CreateImportJobDto {
  /*
  |---------------------------------------------------------------------------
  | source
  |---------------------------------------------------------------------------
  |
  | External source from which the content will be imported.
  |
  */
  @IsEnum(ImportSource)
  source: ImportSource;

  /*
  |---------------------------------------------------------------------------
  | payload
  |---------------------------------------------------------------------------
  |
  | Source-specific data required for importing content.
  |
  */
  @IsNotEmpty()
  @IsObject()
  payload: Record<string, any>;
}
