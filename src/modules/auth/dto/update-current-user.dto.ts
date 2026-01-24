import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateProfileDto } from '@/modules/users/dto/create-profile.dto';

/*
|--------------------------------------------------------------------------
| UpdateCurrentUserDto
|--------------------------------------------------------------------------
|
| Defines the payload used to update the currently authenticated user.
|
| - All fields are optional to support partial updates.
| - Role and password updates are explicitly excluded.
| - Profile updates are allowed through a nested DTO.
|
*/
export class UpdateCurrentUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsPhoneNumber('SA')
  phone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile?: CreateProfileDto;
}
