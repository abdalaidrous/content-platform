import { Expose, Type } from 'class-transformer';
import { EpisodeStatus } from '@/modules/episodes/enums/episode-status.enum';
import { EpisodeLanguage } from '@/modules/episodes/enums/episode-language.enum';
import { ProgramResponseDto } from '@/modules/programs/dto/program.response.dto';

/*
|--------------------------------------------------------------------------
| EpisodeResponseDto
|--------------------------------------------------------------------------
|
| Defines the serialized API response for Episode resources.
|
| This DTO explicitly exposes multilingual fields (Arabic & English)
| and media-related metadata without relying on virtual getters.
|
| Attribute visibility is controlled using role-based serialization groups:
| - public  : Guest users
| - user    : Authenticated users
| - editor  : Content editors
| - admin   : System administrators
|
*/
export class EpisodeResponseDto {
  /*
  |--------------------------------------------------------------------------
  | id
  |--------------------------------------------------------------------------
  |
  | Unique identifier of the episode.
  |
  */
  @Expose({ groups: ['public'] })
  id: string;

  /*
  |--------------------------------------------------------------------------
  | titleAr
  |--------------------------------------------------------------------------
  |
  | Episode title in Arabic.
  |
  */
  @Expose({ groups: ['public'] })
  titleAr: string;

  /*
  |--------------------------------------------------------------------------
  | titleEn
  |--------------------------------------------------------------------------
  |
  | Episode title in English.
  |
  */
  @Expose({ groups: ['public'] })
  titleEn: string;

  /*
  |--------------------------------------------------------------------------
  | descriptionAr
  |--------------------------------------------------------------------------
  |
  | Episode description in Arabic.
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
  | Episode description in English.
  | Visible to authenticated users and above.
  |
  */
  @Expose({ groups: ['public'] })
  descriptionEn?: string;

  /*
  |--------------------------------------------------------------------------
  | mediaUrl
  |--------------------------------------------------------------------------
  |
  | URL of the episode media file.
  | Publicly accessible once published.
  |
  */
  @Expose({ groups: ['public'] })
  mediaUrl: string;

  /*
  |--------------------------------------------------------------------------
  | language
  |--------------------------------------------------------------------------
  |
  | Primary language of the episode.
  |
  */
  @Expose({ groups: ['public'] })
  language: EpisodeLanguage;

  /*
  |--------------------------------------------------------------------------
  | status
  |--------------------------------------------------------------------------
  |
  | Current lifecycle status of the episode.
  | Restricted to editors and administrators.
  |
  */
  @Expose({ groups: ['editor', 'admin'] })
  status: EpisodeStatus;

  /*
  |--------------------------------------------------------------------------
  | publishedAt
  |--------------------------------------------------------------------------
  |
  | Timestamp when the episode was published.
  | Visible to all users once available.
  |
  */
  @Expose({ groups: ['public'] })
  publishedAt?: Date;

  /*
  |--------------------------------------------------------------------------
  | duration
  |--------------------------------------------------------------------------
  |
  | Duration of the episode in seconds.
  |
  */
  @Expose({ groups: ['public'] })
  duration?: number;

  /*
  |--------------------------------------------------------------------------
  | program
  |--------------------------------------------------------------------------
  |
  | Program this episode belongs to.
  | Serialized using ProgramResponseDto.
  |
  */
  @Expose({ groups: ['public'] })
  @Type(() => ProgramResponseDto)
  program: ProgramResponseDto;

  /*
  |--------------------------------------------------------------------------
  | createdAt
  |--------------------------------------------------------------------------
  |
  | Timestamp when the episode was created.
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
  | Timestamp of the last update to the episode.
  | Restricted to administrative users.
  |
  */
  @Expose({ groups: ['admin'] })
  updatedAt: Date;
}
