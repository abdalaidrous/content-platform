import { Controller } from '@nestjs/common';
import { CrudControllerFactory } from '@/common/factories/crud-controller.factory';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/*
|--------------------------------------------------------------------------
| UsersController
|--------------------------------------------------------------------------
|
| HTTP controller responsible for exposing User-related CRUD endpoints.
|
| This controller is generated using CrudControllerFactory to:
| - Avoid method duplication
| - Enable runtime DTO reflection
| - Ensure ValidationPipe works correctly
|
| Route prefix:
| - /users
|
*/
@Controller('users')
export class UsersController extends CrudControllerFactory<
  User,
  CreateUserDto,
  UpdateUserDto
>(CreateUserDto, UpdateUserDto) {
  /*
  |---------------------------------------------------------------------------
  | Constructor
  |---------------------------------------------------------------------------
  |
  | Initializes the UsersController by injecting the UsersService dependency
  | and passing it to the base CRUD controller.
  |
  */
  constructor(usersService: UsersService) {
    super(usersService);
  }
}
