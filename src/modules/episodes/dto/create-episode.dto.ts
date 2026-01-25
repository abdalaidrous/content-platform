import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsInt,
  Min,
  IsUrl,
} from 'class-validator';
import { EpisodeStatus } from '@/modules/episodes/enums/episode-status.enum';
import { EpisodeLanguage } from '@/modules/episodes/enums/episode-language.enum';

/*
|--------------------------------------------------------------------------
| CreateEpisodeDto
|--------------------------------------------------------------------------
|
| Defines the payload required to create a new episode.
|
| This DTO validates the structure and format of episode data
| coming from the CMS layer.
|
*/
export class CreateEpisodeDto {
  /*
  |--------------------------------------------------------------------------
  | Relations
  |--------------------------------------------------------------------------
  */

  @IsUUID()
  program: string;

  /*
  |--------------------------------------------------------------------------
  | Titles
  |--------------------------------------------------------------------------
  */

  @IsString()
  @IsNotEmpty()
  titleAr: string;

  @IsString()
  @IsNotEmpty()
  titleEn: string;

  /*
  |--------------------------------------------------------------------------
  | Descriptions
  |--------------------------------------------------------------------------
  */

  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  /*
  |--------------------------------------------------------------------------
  | Media
  |--------------------------------------------------------------------------
  */

  @IsString()
  @IsNotEmpty()
  @IsUrl({ require_protocol: true })
  mediaUrl: string;

  /*
  |--------------------------------------------------------------------------
  | Metadata
  |--------------------------------------------------------------------------
  */

  @IsEnum(EpisodeLanguage)
  language: EpisodeLanguage;

  @IsOptional()
  @IsEnum(EpisodeStatus)
  status?: EpisodeStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;
}
