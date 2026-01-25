import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { PaginateConfig } from 'nestjs-paginate';

import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { BaseCrudService } from '@/common/services/base-crud.service';
import { Category } from '@/modules/categories/entities/category.entity';
import { MESSAGES } from '@/common/constants/messages';

/*
|--------------------------------------------------------------------------
| ProgramsService
|--------------------------------------------------------------------------
|
| Encapsulates all program-related business logic and lifecycle operations.
|
| This service extends the BaseCrudService to inherit standard CRUD
| functionality while enforcing program-specific business rules.
|
| Responsibilities:
| - Validate category existence.
| - Manage program lifecycle using a single isActive flag.
| - Provide CMS-safe create/update operations.
|
*/
@Injectable()
export class ProgramsService extends BaseCrudService<
  Program,
  CreateProgramDto,
  UpdateProgramDto
> {
  /*
  |--------------------------------------------------------------------------
  | paginateConfig
  |--------------------------------------------------------------------------
  |
  | Pagination, filtering and sorting configuration
  | specific to the Program entity.
  |
  */
  protected get paginateConfig(): PaginateConfig<Program> {
    return {
      sortableColumns: ['id', 'createdAt'],
      searchableColumns: ['titleAr', 'titleEn'],
      filterableColumns: {
        isActive: true,
        type: true,
        createdAt: true,
      },
      defaultSortBy: [['createdAt', 'DESC']],
      relations: ['category'],
    };
  }

  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Initializes the ProgramsService by injecting the Program and Category
  | repositories along with the internationalization service.
  |
  */
  constructor(
    @InjectRepository(Program)
    private readonly programRepo: Repository<Program>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly i18n: I18nService,
  ) {
    super(programRepo);
  }

  /*
 |--------------------------------------------------------------------------
 | validateCategory
 |--------------------------------------------------------------------------
 |
 | Ensures the referenced category exists, is active,
 | and not soft-deleted.
 |
 */
  private async validateCategory(categoryId: string): Promise<void> {
    const exists = await this.categoryRepo.findOne({
      where: {
        id: categoryId,
        isActive: true,
        deletedAt: IsNull(),
      },
    });

    if (!exists) {
      throw new BadRequestException(
        this.i18n.t(MESSAGES.ERRORS.CATEGORY_NOT_FOUND),
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | create
  |--------------------------------------------------------------------------
  |
  | Creates a new program.
  |
  | - Validates category existence.
  | - Persists multilingual fields.
  |
  */
  async create(dto: CreateProgramDto): Promise<Program> {
    await this.validateCategory(dto.category);
    return super.create(dto);
  }

  /*
  |--------------------------------------------------------------------------
  | update
  |--------------------------------------------------------------------------
  |
  | Updates an existing program.
  |
  | - Ensures the program exists.
  | - Validates category if updated.
  | - Supports partial updates.
  |
  */
  async update(id: string, dto: UpdateProgramDto): Promise<Program> {
    if (dto.category) {
      await this.validateCategory(dto.category);
    }

    return super.update(id, dto);
  }
}
