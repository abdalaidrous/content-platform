import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { PaginateConfig } from 'nestjs-paginate';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseCrudService } from '@/common/services/base-crud.service';

/*
|--------------------------------------------------------------------------
| CategoriesService
|--------------------------------------------------------------------------
|
| Encapsulates all category-related business logic and lifecycle operations.
| This service extends the BaseCrudService to inherit standard CRUD
| functionality while enforcing category-specific business rules.
|
| Responsibilities:
| - Enforce unique slug constraint.
| - Manage multilingual category fields (Arabic & English).
| - Provide safe read/write operations for CMS and Discovery use cases.
|
*/
@Injectable()
export class CategoriesService extends BaseCrudService<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  /*
  |--------------------------------------------------------------------------
  | paginateConfig
  |--------------------------------------------------------------------------
  |
  | Pagination, filtering and sorting configuration
  | specific to the Category entity.
  |
  */
  protected get paginateConfig(): PaginateConfig<Category> {
    return {
      sortableColumns: ['id', 'createdAt'],
      searchableColumns: ['nameAr', 'nameEn'],
      filterableColumns: {
        isActive: true,
        createdAt: true,
      },
      defaultSortBy: [['createdAt', 'DESC']],
    };
  }

  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Initializes the CategoriesService by injecting the Category repository
  | and internationalization service. The repository is passed to the
  | BaseCrudService to enable shared CRUD operations.
  |
  */
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {
    super(categoryRepo);
  }
}
