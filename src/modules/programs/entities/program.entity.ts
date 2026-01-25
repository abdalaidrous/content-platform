import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Category } from '@/modules/categories/entities/category.entity';
import { ProgramType } from '@/modules/programs/enums/program-type.enum';

/*
|--------------------------------------------------------------------------
| Program
|--------------------------------------------------------------------------
|
| The Program entity represents a media program such as a podcast
| or documentary.
|
| Programs are identified internally using UUIDs and do not rely
| on slugs for public identification.
|
| This entity supports multilingual fields (Arabic & English)
| using a Django-like model translation approach.
|
| Database naming follows snake_case conventions, while
| the domain model uses camelCase.
|
*/
@Entity('programs')
export class Program extends BaseEntity {
  @Column({ name: 'title_ar' })
  titleAr: string;

  @Column({ name: 'title_en' })
  titleEn: string;

  @Column({ type: 'enum', enum: ProgramType })
  type: ProgramType;

  @Column({ name: 'description_ar', type: 'text', nullable: true })
  descriptionAr?: string;

  @Column({ name: 'description_en', type: 'text', nullable: true })
  descriptionEn?: string;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  categoryId: Category;
}
