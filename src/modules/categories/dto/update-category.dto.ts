import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

/*
|--------------------------------------------------------------------------
| UpdateCategoryDto
|--------------------------------------------------------------------------
|
| Defines the payload used to update an existing category.
|
| This DTO extends CreateCategoryDto using PartialType,
| allowing partial updates of category fields.
|
| All fields are optional, enabling flexible update operations
| while preserving validation rules defined in the base DTO.
|
*/
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
