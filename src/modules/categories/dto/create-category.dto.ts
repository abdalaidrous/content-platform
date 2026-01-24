import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

/*
|--------------------------------------------------------------------------
| CreateCategoryDto
|--------------------------------------------------------------------------
|
| Defines the payload required to create a new category.
|
| This DTO supports multilingual input (Arabic & English)
| following a Django-like model translation approach.
|
| Translatable fields are provided per language and later
| resolved transparently at the entity level.
|
| Fields:
| - slug              : Stable public identifier.
| - nameAr / nameEn   : Localized category names.
| - descriptionAr / descriptionEn : Optional localized descriptions.
| - isActive          : Visibility flag (defaults to true).
|
*/
export class CreateCategoryDto {
  /*
  |--------------------------------------------------------------------------
  | Arabic fields
  |--------------------------------------------------------------------------
  */

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameAr: string;

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
  @MaxLength(100)
  nameEn: string;

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
