import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { RssFeed } from './rss-feed.entity';

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

  @OneToMany(() => RssFeed, (rssFeed) => rssFeed.source)
  rssFeeds: RssFeed[];
}
