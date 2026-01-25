import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from '@/common/decorators/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Role } from '@/common/enums/role.enum';
import { ImportsService } from '@/modules/imports/imports.service';
import { CreateImportJobDto } from '@/modules/imports/dto/create-import-job.dto';

/*
|---------------------------------------------------------------------------
| ImportsController
|---------------------------------------------------------------------------
|
| Internal CMS controller responsible for managing
| content import operations.
|
*/
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.EDITOR)
@Controller('imports')
export class ImportsController {
  /*
  |---------------------------------------------------------------------------
  | Constructor
  |---------------------------------------------------------------------------
  |
  | Injects the ImportsService responsible for handling
  | import job business logic.
  |
  */
  constructor(private readonly importsService: ImportsService) {}

  /*
  |---------------------------------------------------------------------------
  | create
  |---------------------------------------------------------------------------
  |
  | Creates a new import job from an external source.
  |
  */
  @Post()
  create(@Body() dto: CreateImportJobDto) {
    return this.importsService.createImportJob(dto);
  }
}
