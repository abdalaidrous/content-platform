import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { MESSAGES } from '@/common/constants/messages';
import { BaseCrudService } from '@/common/services/base-crud.service';
import { PaginateConfig } from 'nestjs-paginate';

/*
|--------------------------------------------------------------------------
| UsersService
|--------------------------------------------------------------------------
|
| Encapsulates all user-related business logic and lifecycle operations.
| This service extends the BaseCrudService to inherit standard CRUD
| functionality while overriding and augmenting behavior where
| user-specific business rules are required.
|
| Responsibilities:
| - Enforce unique email identity for users.
| - Assign roles during user creation.
| - Prevent duplicate role assignments.
|
*/
@Injectable()
export class UsersService extends BaseCrudService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  /*
  |--------------------------------------------------------------------------
  | paginateConfig
  |--------------------------------------------------------------------------
  |
  | Pagination, filtering and sorting configuration
  | specific to the User entity.
  |
  */
  protected get paginateConfig(): PaginateConfig<User> {
    return {
      sortableColumns: ['id', 'createdAt', 'email'],
      searchableColumns: ['name', 'email'],
      filterableColumns: {
        isActive: true,
        role: true,
        createdAt: true,
      },
      defaultSortBy: [['createdAt', 'DESC']],
    };
  }

  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Initializes the UsersService by injecting the User repository and
  | internationalization service. The repository is passed to the
  | BaseCrudService to enable shared CRUD operations.
  |
  */
  constructor(
    @InjectRepository(User)
    public readonly userRepo: Repository<User>,
    private readonly i18n: I18nService,
  ) {
    super(userRepo);
  }

  /*
  |--------------------------------------------------------------------------
  | assignRoleIfMissing
  |--------------------------------------------------------------------------
  |
  | Assigns a new role to an existing user if the role is not already
  | present. Throws an error if the user already exists with the same role.
  |
  */
  private async assignRoleIfMissing(user: User, role: UserRole): Promise<User> {
    if (user.role.includes(role)) {
      throw new BadRequestException(
        this.i18n.t(MESSAGES.ERRORS.USER_ALREADY_EXISTS),
      );
    }

    user.role = [...user.role, role];
    return this.userRepo.save(user);
  }

  /*
  |--------------------------------------------------------------------------
  | create
  |--------------------------------------------------------------------------
  |
  | Creates a new user or assigns an additional role to an existing user.
  | Overrides the base create method to enforce email uniqueness and
  | role assignment rules specific to the User domain.
  |
  */
  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      return this.assignRoleIfMissing(existingUser, dto.role);
    }

    const user = this.userRepo.create({ ...dto, role: [dto.role] });
    await this.userRepo.save(user);
    return user;
  }
}
