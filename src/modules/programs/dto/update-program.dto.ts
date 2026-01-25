import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramDto } from './create-program.dto';

/*
|--------------------------------------------------------------------------
| UpdateProgramDto
|--------------------------------------------------------------------------
|
| Defines the payload used to update an existing program.
|
| All fields are optional, enabling partial updates
| while preserving validation rules.
|
*/
export class UpdateProgramDto extends PartialType(CreateProgramDto) {}
