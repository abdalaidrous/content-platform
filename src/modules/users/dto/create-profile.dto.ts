import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Gender } from '@/modules/users/enums/gender.enum';

/*
|--------------------------------------------------------------------------
| CreateProfileDto
|--------------------------------------------------------------------------
|
| Defines the payload used to create a user profile alongside the user.
| This DTO contains optional, privacy-sensitive, and presentation-related
| fields that are intentionally separated from authentication concerns.
|
| Validation Rules:
| - avatar : Optional string representing the profile image URL.
| - bio    : Optional short biography or description.
| - locale : Optional locale or language preference.
| - gender : Optional gender value from the Gender enum.
|
*/
export class CreateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatar?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  locale?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}
