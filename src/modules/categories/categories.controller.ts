import { Controller, UseGuards } from '@nestjs/common';
import { CrudControllerFactory } from '@/common/factories/crud-controller.factory';

import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { PublicRead } from '@/common/decorators/public-read.decorator';
import { SerializeByRole } from '@/common/decorators/serialize-by-role.decorator';
import { CategoryResponseDto } from '@/modules/categories/dto/category.response.dto';

/*
|--------------------------------------------------------------------------
| CategoriesController
|--------------------------------------------------------------------------
|
| HTTP controller responsible for exposing Category-related CRUD endpoints.
|
| This controller is generated using CrudControllerFactory to:
| - Avoid method duplication
| - Enable runtime DTO reflection
| - Ensure ValidationPipe works correctly
|
| Route prefix:
| - /categories
|
| Access:
| - Restricted to ADMIN and EDITOR roles (CMS usage)
|
*/
@PublicRead()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.EDITOR)
@SerializeByRole(CategoryResponseDto)
@Controller('categories')
export class CategoriesController extends CrudControllerFactory<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
>(CreateCategoryDto, UpdateCategoryDto) {
  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Initializes the CategoriesController by injecting the
  | CategoriesService dependency and passing it to
  | the base CRUD controller.
  |
  */
  constructor(categoriesService: CategoriesService) {
    super(categoriesService);
  }
}
