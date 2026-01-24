import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '@/modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '@/modules/users/entities/profile.entity';

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
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
