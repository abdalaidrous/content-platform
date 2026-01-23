import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/*
|---------------------------------------------------------------------------
| BaseEntity
|---------------------------------------------------------------------------
|
| The BaseEntity class defines common technical fields shared across
| multiple database entities within the application.
|
| It provides a unified definition for primary identifiers and timestamp
| columns, ensuring consistency and reducing duplication across domain
| entities.
|
| This base class is intended strictly for infrastructure-level concerns
| such as identifiers and lifecycle timestamps, and must not include
| any business logic or domain-specific fields.
|
| Fields included:
| - id        : A UUID-based primary identifier.
| - isActive  : Determines whether the entity is active or hidden.
| - createdAt: Timestamp indicating when the record was created.
| - updatedAt: Timestamp indicating the last update.
| - deletedAt: Optional timestamp used for soft deletion.
|
| This class belongs to the common layer and is designed to be extended
| by domain entities while maintaining low coupling and clear boundaries.
|
*/
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
