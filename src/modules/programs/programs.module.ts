import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program } from './entities/program.entity';
import { CategoriesModule } from '@/modules/categories/categories.module';

/*
|--------------------------------------------------------------------------
| ProgramsModule
|--------------------------------------------------------------------------
|
| Groups the Programs controller and service.
|
| Responsible for wiring dependencies related to
| program domain operations.
|
*/
@Module({
  imports: [TypeOrmModule.forFeature([Program]), CategoriesModule],
  providers: [ProgramsService],
  controllers: [ProgramsController],
  exports: [ProgramsService],
})
export class ProgramsModule {}
