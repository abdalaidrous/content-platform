import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '@/modules/users/enums/user-role.enum';

/*
|--------------------------------------------------------------------------
| CreateUserDto
|--------------------------------------------------------------------------
|
| The CreateUserDto defines the payload required to create a new user
| within the system. It enforces input validation rules to ensure data
| integrity and prevent invalid or malformed requests from reaching the
| application layer.
|
| This DTO accepts a single role value, even though the underlying user
| entity may support multiple roles. This design simplifies user creation
| while allowing role expansion through separate flows if needed.
|
| Validation Rules:
| - name     : Required non-empty string representing the user's name.
| - email    : Must be a valid email address and is expected to be unique.
| - password : Must be a string with a minimum length of 8 characters.
| - role     : A single valid role from the UserRole enum.
|
| Business logic such as password hashing and role assignment is handled
| outside of this DTO, keeping it focused purely on validation.
|
*/
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
