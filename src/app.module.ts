import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CoreModule } from '@/core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProgramsModule } from './modules/programs/programs.module';

/*
|--------------------------------------------------------------------------
| AppModule
|--------------------------------------------------------------------------
|
| The AppModule is the root module of the application and serves as the main
| entry point for composing the application structure.
|
| It imports the CoreModule, which is responsible for initializing global
| infrastructure concerns such as configuration, internationalization,
| and other cross-cutting services required at application startup.
|
| Feature-specific modules (e.g., UsersModule) are composed here to expose
| their functionality to the application.
|
| This module remains intentionally lightweight and free of business
| logic, acting solely as the top-level module aggregator.
|
*/
@Module({
  imports: [CoreModule, UsersModule, AuthModule, CategoriesModule, ProgramsModule],
})
export class AppModule {}
