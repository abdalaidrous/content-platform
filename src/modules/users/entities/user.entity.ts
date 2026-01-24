import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { UserRole } from '@/modules/users/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
|
| The User entity represents an authenticated identity within the system.
| It is used for both content management (CMS) users and public-facing
| users, differentiated by assigned roles.
|
| A user may hold multiple roles simultaneously, allowing the same account
| to act as an administrator or editor within the CMS while also behaving
| as a regular viewer in the discovery experience.
|
| The password field stores a hashed representation of the user's password.
| Plain-text passwords are never persisted. Password hashing is enforced
| at the entity level using lifecycle hooks to guarantee data safety,
| regardless of the creation flow.
|
| Fields:
| - name     : Human-readable display name.
| - email    : Unique email address used as the primary identifier.
| - password : Hashed user password (never stored in plain text).
| - role     : A collection of high-level roles assigned to the user.
|
| This entity extends the BaseEntity to inherit technical fields such as
| identifiers and lifecycle timestamps.
|
*/
@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, array: true })
  role: UserRole[];

  /*
  |--------------------------------------------------------------------------
  | isAdmin
  |--------------------------------------------------------------------------
  |
  | Checks whether the user has the ADMIN role.
  |
  */
  isAdmin(): boolean {
    return this.role?.includes(UserRole.ADMIN);
  }

  /*
  |--------------------------------------------------------------------------
  | isEditor
  |--------------------------------------------------------------------------
  |
  | Checks whether the user has the EDITOR role.
  |
  */
  isEditor(): boolean {
    return this.role?.includes(UserRole.EDITOR);
  }

  /*
  |--------------------------------------------------------------------------
  | isViewer
  |--------------------------------------------------------------------------
  |
  | Checks whether the user has the VIEWER role.
  |
  */
  isViewer(): boolean {
    return this.role?.includes(UserRole.VIEWER);
  }

  /*
  |--------------------------------------------------------------------------
  | verifyPassword
  |--------------------------------------------------------------------------
  |
  | Compares a plain password with the stored hashed password.
  |
  */
  async verifyPassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }

  /*
  |--------------------------------------------------------------------------
  | setPassword
  |--------------------------------------------------------------------------
  |
  | Hashes and sets the user's password.
  |
  | This method should be used whenever the password
  | is created or updated.
  |
  */
  async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  /*
  |--------------------------------------------------------------------------
  | hashPassword
  |--------------------------------------------------------------------------
  |
  | Ensures the password is hashed before inserting
  | the entity into the database.
  |
  */
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      await this.setPassword(this.password);
    }
  }
}
