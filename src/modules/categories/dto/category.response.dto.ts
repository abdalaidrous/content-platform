import { Expose } from 'class-transformer';

/*
|--------------------------------------------------------------------------
| CategoryResponseDto
|--------------------------------------------------------------------------
|
| Defines the serialized API response for Category resources.
|
| This DTO exposes language-agnostic virtual properties (name, description)
| while hiding internal localization fields (nameAr, nameEn, etc.).
|
| Attribute visibility is controlled using role-based serialization groups:
| - public  : Guest users
| - user    : Authenticated users
| - editor  : Content editors
| - admin   : System administrators
|
*/
export class CategoryResponseDto {
  /*
  |--------------------------------------------------------------------------
  | id
  |--------------------------------------------------------------------------
  |
  | Unique identifier of the category.
  | Visible to all users including guests.
  |
  */
  @Expose({ groups: ['public'] })
  id: number;

  /*
  |--------------------------------------------------------------------------
  | name
  |--------------------------------------------------------------------------
  |
  | Localized category name.
  | Resolved dynamically based on the current language context.
  |
  */
  @Expose({ groups: ['public'] })
  nameAr: string;

  /*
  |--------------------------------------------------------------------------
  | name
  |--------------------------------------------------------------------------
  |
  | Localized category name.
  | Resolved dynamically based on the current language context.
  |
  */
  @Expose({ groups: ['public'] })
  nameEn: string;

  /*
  |--------------------------------------------------------------------------
  | description
  |--------------------------------------------------------------------------
  |
  | Optional localized category description.
  | Visible only to authenticated users and above.
  |
  */
  @Expose({ groups: ['public'] })
  descriptionAr?: string;

  /*
  |--------------------------------------------------------------------------
  | description
  |--------------------------------------------------------------------------
  |
  | Optional localized category description.
  | Visible only to authenticated users and above.
  |
  */
  @Expose({ groups: ['public'] })
  descriptionEn?: string;

  /*
  |--------------------------------------------------------------------------
  | isActive
  |--------------------------------------------------------------------------
  |
  | Indicates whether the category is active and visible.
  | Restricted to administrative users.
  |
  */
  @Expose({ groups: ['editor', 'admin'] })
  isActive: boolean;

  /*
  |--------------------------------------------------------------------------
  | createdAt
  |--------------------------------------------------------------------------
  |
  | Timestamp when the category was created.
  | Exposed only for administrative and auditing purposes.
  |
  */
  @Expose({ groups: ['editor', 'admin'] })
  createdAt: Date;

  /*
  |--------------------------------------------------------------------------
  | updatedAt
  |--------------------------------------------------------------------------
  |
  | Timestamp of the last update to the category.
  | Visible only to administrators.
  |
  */
  @Expose({ groups: ['editor', 'admin'] })
  updatedAt: Date;
}
