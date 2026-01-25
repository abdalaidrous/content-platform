import { Controller, UseGuards } from '@nestjs/common';
import { CrudControllerFactory } from '@/common/factories/crud-controller.factory';

import { EpisodesService } from './episodes.service';
import { Episode } from './entities/episode.entity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { PublicRead } from '@/common/decorators/public-read.decorator';
import { SerializeByRole } from '@/common/decorators/serialize-by-role.decorator';
import { EpisodeResponseDto } from '@/modules/episodes/dto/episode.response.dto';

/*
|--------------------------------------------------------------------------
| EpisodesController
|--------------------------------------------------------------------------
|
| CMS controller responsible for managing episodes.
|
| Provides CRUD endpoints for editors and administrators
| to create, update, and manage episode metadata.
|
*/
@PublicRead()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.EDITOR)
@SerializeByRole(EpisodeResponseDto)
@Controller('episodes')
export class EpisodesController extends CrudControllerFactory<
  Episode,
  CreateEpisodeDto,
  UpdateEpisodeDto
>(CreateEpisodeDto, UpdateEpisodeDto) {
  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Initializes the EpisodesController by injecting the
  | EpisodesService and passing it to the base CRUD controller.
  |
  */
  constructor(episodesService: EpisodesService) {
    super(episodesService);
  }
}
