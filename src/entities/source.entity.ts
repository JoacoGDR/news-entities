import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { RssFeed } from './rss-feed.entity';
import { SourceBias } from './source-bias.entity';

@Entity('sources')
export class Source extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  domain: string;

  @Column({ type: 'varchar', nullable: true, name: 'logo_url' })
  logoUrl: string;

  @Column({ type: 'varchar' })
  location: string;

  @OneToMany(() => RssFeed, (rssFeed) => rssFeed.source, { cascade: true })
  rssFeeds: RssFeed[];

  @OneToOne(() => SourceBias, { eager: false })
  @JoinColumn({ name: 'id', referencedColumnName: 'source_id' })
  bias?: SourceBias;
}
