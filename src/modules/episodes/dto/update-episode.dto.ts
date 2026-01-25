import { PartialType } from '@nestjs/mapped-types';
import { CreateEpisodeDto } from './create-episode.dto';

/*
|--------------------------------------------------------------------------
| UpdateEpisodeDto
|--------------------------------------------------------------------------
|
| Defines the payload used to update an existing episode.
|
| All fields are optional to support partial updates.
|
*/
export class UpdateEpisodeDto extends PartialType(CreateEpisodeDto) {}
