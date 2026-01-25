import { Controller, UseGuards } from '@nestjs/common';
import { CrudControllerFactory } from '@/common/factories/crud-controller.factory';

import { ProgramsService } from './programs.service';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';

/*
|--------------------------------------------------------------------------
| ProgramsController
|--------------------------------------------------------------------------
|
| HTTP controller responsible for exposing Program-related CRUD endpoints.
|
| This controller is generated using CrudControllerFactory to:
| - Avoid method duplication
| - Enable runtime DTO reflection
| - Ensure ValidationPipe works correctly
|
| Route prefix:
| - /programs
|
| Access:
| - Restricted to ADMIN and EDITOR roles (CMS usage)
|
*/
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.EDITOR)
@Controller('programs')
export class ProgramsController extends CrudControllerFactory<
  Program,
  CreateProgramDto,
  UpdateProgramDto
>(CreateProgramDto, UpdateProgramDto) {
  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Initializes the ProgramsController by injecting the ProgramsService
  | dependency and passing it to the base CRUD controller.
  |
  */
  constructor(programsService: ProgramsService) {
    super(programsService);
  }
}
