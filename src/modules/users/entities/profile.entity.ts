import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Gender } from '@/modules/users/enums/gender.enum';
/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
|
| Represents the user's personal and public-facing profile information.
| This entity is separated from the User entity to maintain a clear
| separation of concerns between authentication/identity data and
| presentation or personal metadata.
|
| The Profile entity contains optional and privacy-sensitive fields
| such as avatar, biography, locale, and gender, allowing flexible
| user representation without enforcing unnecessary data collection.
|
| Each Profile is associated with exactly one User and is automatically
| removed when the owning User is deleted, ensuring data consistency
| and preventing orphaned records.
|
*/
@Entity('profiles')
export class Profile extends BaseEntity {
  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ default: 'en' })
  locale: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
