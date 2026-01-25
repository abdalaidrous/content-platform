import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { paginate, PaginateConfig, PaginateQuery } from 'nestjs-paginate';

/*
|--------------------------------------------------------------------------
| BaseCrudService
|--------------------------------------------------------------------------
|
| Provides a reusable, generic CRUD service implementation.
|
| This base service handles common persistence operations and is intended
| to be extended by feature-specific services.
|
| Key principles:
| - Operates on DTOs at the service boundary
| - Keeps ORM-specific types (DeepPartial) encapsulated
| - Contains no business logic or authorization rules
|
*/
export abstract class BaseCrudService<
  Entity extends { id: any },
  CreateDto,
  UpdateDto,
> {
  /*
  |--------------------------------------------------------------------------
  | paginateConfig
  |--------------------------------------------------------------------------
  |
  | Each entity MUST define its pagination configuration.
  |
  */
  protected abstract get paginateConfig(): PaginateConfig<Entity>;

  /*
  |--------------------------------------------------------------------------
  | constructor
  |--------------------------------------------------------------------------
  |
  | Injects the TypeORM repository used to perform
  | persistence operations for the entity.
  |
  */
  protected constructor(protected readonly repository: Repository<Entity>) {}

  /*
  |--------------------------------------------------------------------------
  | beforeCreate
  |--------------------------------------------------------------------------
  |
  | Lifecycle hook executed before creating a new entity.
  |
  | Allows extending services to:
  | - Validate input data
  | - Enforce domain rules
  | - Prepare or transform creation payload
  |
  | This hook receives only the creation DTO since
  | the entity instance does not exist yet.
  |
  */
  protected beforeCreate(_dto: CreateDto): void {}

  /*
  |--------------------------------------------------------------------------
  | create
  |--------------------------------------------------------------------------
  |
  | Creates and persists a new entity using the provided creation DTO.
  |
  | This method is intentionally generic and delegates:
  | - Validation to DTOs
  | - Business rules to higher-level services
  |
  | ORM-specific mapping is kept internal to this layer.
  |
  */
  async create(dto: CreateDto): Promise<Entity> {
    this.beforeCreate(dto);
    const entity = this.repository.create(dto as DeepPartial<Entity>);
    return this.repository.save(entity);
  }

  /*
  |--------------------------------------------------------------------------
  | findAll
  |--------------------------------------------------------------------------
  |
  | Retrieves all entities of the given type.
  |
  | Intended for simple listing operations without filtering
  | or pagination.
  |
  */
  async findAll(query: PaginateQuery) {
    return paginate(query, this.repository, this.paginateConfig);
  }

  /*
  |--------------------------------------------------------------------------
  | findOne
  |--------------------------------------------------------------------------
  |
  | Retrieves a single entity by its unique identifier.
  |
  | Throws a NotFoundException if the entity does not exist.
  |
  */
  async findOne(id: Entity['id']): Promise<Entity> {
    const entity = await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<Entity>);

    if (!entity) {
      throw new NotFoundException('Resource not found');
    }

    return entity;
  }

  /*
  |--------------------------------------------------------------------------
  | beforeUpdate
  |--------------------------------------------------------------------------
  |
  | Lifecycle hook executed before updating an existing entity.
  |
  | Allows extending services to:
  | - Apply domain-specific state transitions
  | - Validate update constraints
  | - Mutate the entity instance safely
  |
  | This hook receives both the update DTO and the
  | currently persisted entity instance.
  |
  */
  protected beforeUpdate(_dto: UpdateDto, _entity: Entity): void {}

  /*
  |--------------------------------------------------------------------------
  | update
  |--------------------------------------------------------------------------
  |
  | Updates an existing entity using the provided update DTO.
  |
  | The entity is first retrieved to ensure existence,
  | then merged with the new data and persisted.
  |
  */
  async update(id: Entity['id'], dto: UpdateDto): Promise<Entity> {
    const entity = await this.findOne(id);
    this.beforeUpdate(dto, entity);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  /*
  |--------------------------------------------------------------------------
  | beforeDelete
  |--------------------------------------------------------------------------
  |
  | Lifecycle hook executed before deleting an entity.
  |
  | Allows extending services to:
  | - Prevent deletion based on domain rules
  | - Trigger side effects (e.g. cleanup, audit)
  | - Enforce referential or business constraints
  |
  | This hook receives the entity instance
  | that is about to be removed.
  |
  */
  protected beforeDelete(_entity: Entity): void {}

  /*
  |--------------------------------------------------------------------------
  | remove
  |--------------------------------------------------------------------------
  |
  | Permanently deletes an entity by its identifier.
  |
  | Throws a NotFoundException if the entity does not exist.
  |
  */
  async remove(id: Entity['id']): Promise<void> {
    const entity = await this.findOne(id);
    this.beforeDelete(entity);
    await this.repository.remove(entity);
  }
}
