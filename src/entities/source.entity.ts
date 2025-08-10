import {
  Entity,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { RssEntry } from './rss-entry.entity';
import { BaseEntity } from './base.entity';

@Entity('sources')
export class Source extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true, name: 'rss_feed_url' })
  rssFeedUrl: string;

  @Column({ type: 'varchar' })
  domain: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'timestamp', nullable: true, name: 'last_fetched_at' })
  lastFetchedAt: Date;

  @OneToMany(() => RssEntry, (rssEntry) => rssEntry.source)
  rssEntries: RssEntry[];
}
