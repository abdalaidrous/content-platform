import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';

/*
|--------------------------------------------------------------------------
| Category
|--------------------------------------------------------------------------
|
| The Category entity represents a high-level classification used to
| organize programs and content within the system.
|
| Categories are language-aware and support multiple locales (Arabic
| and English) using a Django-like model translation approach.
|
| Translatable fields are stored per language at the database level
| while exposed as virtual properties (e.g. `name`, `description`)
| that automatically resolve based on the current language context.
|
| This design provides:
| - High read performance
| - Simple querying and indexing
| - A clean, language-agnostic domain model
|
| Fields:
| - nameAr / nameEn : Localized category name.
| - descriptionAr / descriptionEn : Optional localized descriptions.
| - isActive        : Indicates whether the category is visible.
|
*/
@Entity('categories')
export class Category extends BaseEntity {
  @Column({ name: 'name_ar' })
  nameAr: string;

  @Column({ name: 'name_en' })
  nameEn: string;

  @Column({ name: 'description_ar', type: 'text', nullable: true })
  descriptionAr?: string;

  @Column({ name: 'description_en', type: 'text', nullable: true })
  descriptionEn?: string;
}
