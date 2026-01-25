import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';
import { Episode } from './entities/episode.entity';
import { ProgramsModule } from '@/modules/programs/programs.module';

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
  imports: [TypeOrmModule.forFeature([Episode]), ProgramsModule],
  providers: [EpisodesService],
  controllers: [EpisodesController],
  exports: [EpisodesService],
})
export class EpisodesModule {}
