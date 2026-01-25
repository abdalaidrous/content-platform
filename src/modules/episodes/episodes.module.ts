import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { Episode } from './entities/episode.entity';
import { Program } from '@/modules/programs/entities/program.entity';

/*
|--------------------------------------------------------------------------
| EpisodesModule
|--------------------------------------------------------------------------
|
| Groups the Episodes controller and service.
|
| Responsible for wiring dependencies related to
| episode domain operations.
|
*/
@Module({
  imports: [TypeOrmModule.forFeature([Episode, Program])],
  providers: [EpisodesService],
  controllers: [EpisodesController],
  exports: [EpisodesService],
})
export class EpisodesModule {}
