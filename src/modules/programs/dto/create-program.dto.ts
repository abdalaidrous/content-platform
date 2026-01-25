import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ProgramType } from '@/modules/programs/enums/program-type.enum';

/*
|--------------------------------------------------------------------------
| CreateProgramDto
|--------------------------------------------------------------------------
|
| Defines the payload required to create a new program.
|
| This DTO supports multilingual fields (Arabic & English)
| using a Django-like model translation approach.
|
| Fields:
| - type                    : Program type (podcast | documentary).
| - categoryId              : Associated category identifier.
| - titleAr / titleEn       : Localized titles.
| - descriptionAr / descriptionEn : Optional localized descriptions.
| - isActive                : Visibility flag.
|
*/
export class CreateProgramDto {
  /*
  |--------------------------------------------------------------------------
  | Type
  |--------------------------------------------------------------------------
  */

  @IsEnum(ProgramType)
  type: ProgramType;

  /*
  |--------------------------------------------------------------------------
  | Relations
  |--------------------------------------------------------------------------
  */

  @IsUUID()
  categoryId: string;

  /*
  |--------------------------------------------------------------------------
  | Arabic fields
  |--------------------------------------------------------------------------
  */

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  titleAr: string;

  @IsOptional()
  @IsString()
  descriptionAr?: string;

  /*
  |--------------------------------------------------------------------------
  | English fields
  |--------------------------------------------------------------------------
  */

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  titleEn: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  /*
  |--------------------------------------------------------------------------
  | Status
  |--------------------------------------------------------------------------
  */

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
