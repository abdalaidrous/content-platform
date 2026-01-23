import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '@/modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

/*
|--------------------------------------------------------------------------
| UsersModule
|--------------------------------------------------------------------------
|
| Groups the Users controller and service.
|
| Responsible for wiring dependencies related to
| user domain operations.
|
*/
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
