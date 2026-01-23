import { Paginated, PaginateQuery } from 'nestjs-paginate';

/*
|--------------------------------------------------------------------------
| CrudService
|--------------------------------------------------------------------------
|
| Defines the contract that any CRUD service must implement in order
| to be compatible with the BaseCrudController.
|
*/
export interface CrudService<Entity, CreateDto, UpdateDto> {
  create(data: CreateDto): Promise<Entity>;
  findAll(query: PaginateQuery): Promise<Paginated<Entity>>;
  findOne(id: string): Promise<Entity>;
  update(id: string, data: UpdateDto): Promise<Entity>;
  remove(id: string): Promise<void>;
}
