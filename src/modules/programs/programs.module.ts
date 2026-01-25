import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { Program } from './entities/program.entity';
import { Category } from '@/modules/categories/entities/category.entity';

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
  imports: [TypeOrmModule.forFeature([Program, Category])],
  providers: [ProgramsService],
  controllers: [ProgramsController],
  exports: [ProgramsService],
})
export class ProgramsModule {}
