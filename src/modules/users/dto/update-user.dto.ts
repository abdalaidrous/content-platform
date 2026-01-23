import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/*
|---------------------------------------------------------------------------
| UpdateUserDto
|---------------------------------------------------------------------------
|
| The UpdateUserDto is derived from CreateUserDto using PartialType,
| making all fields optional while preserving the same validation rules.
|
| This approach avoids duplication and ensures consistency between
| create and update operations.
|
*/
export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
  'role',
] as const) {}
