import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { MESSAGES } from '@/common/constants/messages';
import { BaseCrudService } from '@/common/services/base-crud.service';
import { PaginateConfig } from 'nestjs-paginate';
import { CreateUserInput } from '@/modules/users/interfaces/create-user-input.interface';
import { Profile } from '@/modules/users/entities/profile.entity';

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
    private readonly userRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private readonly i18n: I18nService,
  ) {
    super(userRepo);
  }

  /*
  |--------------------------------------------------------------------------
  | findById
  |--------------------------------------------------------------------------
  |
  | Retrieves a user by its unique identifier.
  |
  | - Returns the user entity if found.
  | - Throws a BadRequestException if the user does not exist.
  | - Optional filters can be applied to constrain the lookup
  |   (e.g. active users, non-deleted users).
  |
  */
  async findById(id: string, filters?: FindOptionsWhere<User>): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        id,
        ...filters,
      },
    });

    if (!user) {
      throw new BadRequestException(
        this.i18n.t(MESSAGES.ERRORS.USER_NOT_FOUND),
      );
    }

    return user;
  }

  /*
  |--------------------------------------------------------------------------
  | findUserByEmail
  |--------------------------------------------------------------------------
  |
  | Retrieves a user by email address.
  |
  | - Returns null if no user is found.
  | - Additional filters can be applied by the caller if needed.
  |
  */
  async findUserByEmail(
    email: string,
    filters?: FindOptionsWhere<User>,
  ): Promise<User | null> {
    return this.userRepo.findOne({
      where: {
        email,
        ...filters,
      },
    });
  }

  /*
  |--------------------------------------------------------------------------
  | findActiveUserByEmail
  |--------------------------------------------------------------------------
  |
  | Retrieves an active, non-deleted user by email address.
  |
  */
  async findActiveUserByEmail(email: string): Promise<User | null> {
    return this.findUserByEmail(email, { isActive: true, deletedAt: IsNull() });
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
  async create(dto: CreateUserInput): Promise<User> {
    /*
    |--------------------------------------------------------------------------
    | Role Resolution
    |--------------------------------------------------------------------------
    |
    | Determines the effective role for the user.
    | Defaults to VIEWER when no role is explicitly provided.
    |
    */
    const effectiveRole = dto.role ?? UserRole.VIEWER;

    /*
    |----------------------------------------------------------------------
    | Existing User Lookup
    |----------------------------------------------------------------------
    |
    | Attempts to find an existing user by email in order to enforce
    | uniqueness and support role augmentation for existing accounts.
    |
    */
    const existingUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    /*
    |----------------------------------------------------------------------
    | Existing User
    |----------------------------------------------------------------------
    |
    | If the user already exists, ensures the requested role is assigned
    | without creating duplicate role entries.
    |
    */
    if (existingUser) {
      throw new BadRequestException(
        this.i18n.t(MESSAGES.ERRORS.USER_ALREADY_EXISTS),
      );
    }

    /*
    |----------------------------------------------------------------------
    | Persistence
    |----------------------------------------------------------------------
    |
    | Persists the newly created user entity to the database.
    |
    */
    const { profile = {} } = dto;
    const user = this.userRepo.create({ ...dto, role: [effectiveRole] });
    user.profile = this.profileRepo.create({ ...profile });
    await this.userRepo.save(user);
    return user;
  }

  /*
  |--------------------------------------------------------------------------
  | createAdmin
  |--------------------------------------------------------------------------
  |
  | Creates a new administrator user or assigns the ADMIN role
  | to an existing user.
  |
  | This method should be used by privileged system workflows
  | and administrative interfaces only.
  |
  */
  async createAdmin(dto: CreateUserInput): Promise<User> {
    return this.create({ ...dto, role: UserRole.ADMIN });
  }

  /*
  |--------------------------------------------------------------------------
  | createEditor
  |--------------------------------------------------------------------------
  |
  | Creates a new editor user or assigns the EDITOR role
  | to an existing user.
  |
  | Editors are typically allowed to manage content but
  | do not have full administrative privileges.
  |
  */
  async createEditor(dto: CreateUserInput): Promise<User> {
    return this.create({ ...dto, role: UserRole.EDITOR });
  }

  /*
  |--------------------------------------------------------------------------
  | createViewer
  |--------------------------------------------------------------------------
  |
  | Creates a new viewer user or assigns the VIEWER role
  | to an existing user.
  |
  | Viewers usually have read-only access to the system.
  |
  */
  async createViewer(dto: CreateUserInput): Promise<User> {
    return this.create({ ...dto, role: UserRole.VIEWER });
  }
}
