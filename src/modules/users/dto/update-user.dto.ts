import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/*
|--------------------------------------------------------------------------
| UpdateUserDto
|--------------------------------------------------------------------------
|
| DTO used for updating an existing user.
|
| - Inherits validation rules from CreateUserDto
| - Makes all properties optional
| - Excludes password and role fields
|
*/
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'role', 'confirmNewPassword'] as const),
) {}
