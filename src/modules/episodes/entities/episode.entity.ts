import { Entity, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Program } from '@/modules/programs/entities/program.entity';
import { EpisodeStatus } from '@/modules/episodes/enums/episode-status.enum';
import { EpisodeLanguage } from '@/modules/episodes/enums/episode-language.enum';

/*
|--------------------------------------------------------------------------
| Episode
|--------------------------------------------------------------------------
|
| Represents a single episode within a program.
|
| Episodes follow a simple content lifecycle:
| - draft     : created but not visible
| - published : visible to end users
| - archived  : hidden but kept for history
|
| Publication timing is stored separately
| using `publishedAt` for metadata purposes.
|
*/
@Entity('episodes')
export class Episode extends BaseEntity {
  @ManyToOne(() => Program, { nullable: false })
  @JoinColumn({ name: 'program_id' })
  program: Program;

  @Column({ name: 'title_ar' })
  titleAr: string;

  @Column({ name: 'title_en' })
  titleEn: string;

  @Column({ name: 'description_ar', type: 'text', nullable: true })
  descriptionAr?: string;

  @Column({ name: 'description_en', type: 'text', nullable: true })
  descriptionEn?: string;

  @Column({ name: 'media_url', type: 'varchar', length: 2048 })
  mediaUrl: string;

  @Column({ name: 'language', type: 'enum', enum: EpisodeLanguage })
  language: EpisodeLanguage;

  @Column({ type: 'enum', enum: EpisodeStatus, default: EpisodeStatus.DRAFT })
  status: EpisodeStatus;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt?: Date;

  @Column({ name: 'duration', type: 'int', nullable: true })
  duration?: number;

  /*
  |--------------------------------------------------------------------------
  | publish
  |--------------------------------------------------------------------------
  |
  | Publishes the episode by transitioning its status to PUBLISHED
  | and setting the publication timestamp.
  |
  */
  publish(): void {
    if (this.status === EpisodeStatus.PUBLISHED) {
      return;
    }

    this.status = EpisodeStatus.PUBLISHED;
    this.publishedAt = new Date();
  }

  /*
  |--------------------------------------------------------------------------
  | Defaults on creation
  |--------------------------------------------------------------------------
  |
  | If an episode is created as published,
  | set publishedAt automatically.
  |
  */
  @BeforeInsert()
  setPublishedAtOnCreate(): void {
    if (this.status === EpisodeStatus.PUBLISHED && !this.publishedAt) {
      this.publishedAt = new Date();
    }
  }
}
