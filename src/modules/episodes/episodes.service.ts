import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { PaginateConfig } from 'nestjs-paginate';

import { Episode } from './entities/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { BaseCrudService } from '@/common/services/base-crud.service';
import { Program } from '@/modules/programs/entities/program.entity';
import { MESSAGES } from '@/common/constants/messages';
import { EpisodeStatus } from '@/modules/episodes/enums/episode-status.enum';

/*
|--------------------------------------------------------------------------
| EpisodesService
|--------------------------------------------------------------------------
|
| Handles episode-related business logic.
|
*/
@Injectable()
export class EpisodesService extends BaseCrudService<
  Episode,
  CreateEpisodeDto,
  UpdateEpisodeDto
> {
  /*
  |--------------------------------------------------------------------------
  | paginateConfig
  |--------------------------------------------------------------------------
  |
  | Pagination, filtering, and sorting configuration
  | specific to the Episode entity.
  |
  | This configuration is used by the base CRUD layer
  | to support CMS listing, searching, and filtering
  | of episodes.
  |
  */
  protected get paginateConfig(): PaginateConfig<Episode> {
    return {
      sortableColumns: ['id', 'createdAt', 'publishedAt'],
      searchableColumns: ['titleAr', 'titleEn'],
      filterableColumns: {
        status: true,
        language: true,
        createdAt: true,
      },
      defaultSortBy: [['createdAt', 'DESC']],
      relations: ['program'],
    };
  }

  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Initializes the EpisodesService by injecting the Episode
  | and Program repositories along with the i18n service.
  |
  | The Episode repository is passed to the BaseCrudService
  | to enable shared CRUD functionality.
  |
  */
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepo: Repository<Episode>,
    @InjectRepository(Program)
    private readonly programRepo: Repository<Program>,
    private readonly i18n: I18nService,
  ) {
    super(episodeRepo);
  }

  /*
  |--------------------------------------------------------------------------
  | validateProgram
  |--------------------------------------------------------------------------
  |
  | Ensures the referenced program exists and is active.
  |
  */
  private async validateProgram(programId: string): Promise<void> {
    const exists = await this.programRepo.findOne({
      where: {
        id: programId,
        isActive: true,
        deletedAt: IsNull(),
      },
    });

    if (!exists) {
      throw new BadRequestException(
        this.i18n.t(MESSAGES.ERRORS.PROGRAM_NOT_FOUND),
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | create
  |--------------------------------------------------------------------------
  |
  | Creates a new episode.
  |
  | - Validates that the referenced program exists and is active.
  | - Delegates persistence logic to the base CRUD service.
  | - Domain defaults (e.g. publishing metadata) are handled
  |   at the entity level.
  |
  */
  async create(dto: CreateEpisodeDto): Promise<Episode> {
    await this.validateProgram(dto.program);
    return super.create(dto);
  }

  /*
  |--------------------------------------------------------------------------
  | beforeUpdate
  |--------------------------------------------------------------------------
  |
  | Lifecycle hook executed before updating an existing entity.
  |
  | Allows extending services to:
  | - Apply domain-specific state transitions
  | - Validate update constraints
  | - Mutate the entity instance safely
  |
  | This hook receives both the update DTO and the
  | currently persisted entity instance.
  |
  */
  protected beforeUpdate(_dto: UpdateEpisodeDto, _entity: Episode): void {
    if (_dto.status === EpisodeStatus.PUBLISHED) {
      _entity.publish();
    }
  }

  /*
  |--------------------------------------------------------------------------
  | update
  |--------------------------------------------------------------------------
  |
  | Updates an existing episode.
  |
  | - Validates the program relation if a new program is provided.
  | - Applies partial updates only.
  | - Domain-specific state transitions are handled separately
  |   from the generic CRUD update flow.
  |
  */
  async update(id: string, dto: UpdateEpisodeDto): Promise<Episode> {
    if (dto.program) {
      await this.validateProgram(dto.program);
    }
    return super.update(id, dto);
  }
}
