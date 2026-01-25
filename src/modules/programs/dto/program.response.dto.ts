import { Expose, Type } from 'class-transformer';
import { ProgramType } from '@/modules/programs/enums/program-type.enum';
import { CategoryResponseDto } from '@/modules/categories/dto/category.response.dto';

/*
|--------------------------------------------------------------------------
| ProgramResponseDto
|--------------------------------------------------------------------------
|
| Defines the serialized API response for Program resources.
|
| This DTO explicitly exposes multilingual fields (Arabic & English)
| without relying on virtual getters or locale resolution.
|
| Attribute visibility is controlled using role-based serialization groups:
| - public  : Guest users
| - user    : Authenticated users
| - editor  : Content editors
| - admin   : System administrators
|
*/
export class ProgramResponseDto {
  /*
  |--------------------------------------------------------------------------
  | id
  |--------------------------------------------------------------------------
  |
  | Unique identifier of the program.
  |
  */
  @Expose({ groups: ['public'] })
  id: string;

  /*
  |--------------------------------------------------------------------------
  | titleAr
  |--------------------------------------------------------------------------
  |
  | Program title in Arabic.
  |
  */
  @Expose({ groups: ['public'] })
  titleAr: string;

  /*
  |--------------------------------------------------------------------------
  | titleEn
  |--------------------------------------------------------------------------
  |
  | Program title in English.
  |
  */
  @Expose({ groups: ['public'] })
  titleEn: string;

  /*
  |--------------------------------------------------------------------------
  | type
  |--------------------------------------------------------------------------
  |
  | Program type (e.g. podcast, documentary).
  |
  */
  @Expose({ groups: ['public'] })
  type: ProgramType;

  /*
  |--------------------------------------------------------------------------
  | descriptionAr
  |--------------------------------------------------------------------------
  |
  | Program description in Arabic.
  | Visible to authenticated users and above.
  |
  */
  @Expose({ groups: ['public'] })
  descriptionAr?: string;

  /*
  |--------------------------------------------------------------------------
  | descriptionEn
  |--------------------------------------------------------------------------
  |
  | Program description in English.
  | Visible to authenticated users and above.
  |
  */
  @Expose({ groups: ['public'] })
  descriptionEn?: string;

  /*
  |--------------------------------------------------------------------------
  | category
  |--------------------------------------------------------------------------
  |
  | Category this program belongs to.
  |
  */
  @Expose({ groups: ['public'] })
  @Type(() => CategoryResponseDto)
  category: CategoryResponseDto;

  /*
  |--------------------------------------------------------------------------
  | createdAt
  |--------------------------------------------------------------------------
  |
  | Timestamp when the program was created.
  | Restricted to administrative users.
  |
  */
  @Expose({ groups: ['admin'] })
  createdAt: Date;

  /*
  |--------------------------------------------------------------------------
  | updatedAt
  |--------------------------------------------------------------------------
  |
  | Timestamp of the last update to the program.
  | Restricted to administrative users.
  |
  */
  @Expose({ groups: ['admin'] })
  updatedAt: Date;
}
