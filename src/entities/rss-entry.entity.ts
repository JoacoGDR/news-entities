import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ScrapedArticle } from './scraped-article.entity';
import { BaseEntity } from './base.entity';
import { RssFeed } from './rss-feed.entity';

@Entity('rss_entries')
export class RssEntry extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar' })
  @Index({ unique: true })
  url: string;

  @Column({ type: 'timestamp', name: 'published_at' })
  publishedAt: Date;

  @ManyToOne(() => RssFeed, (rssFeed) => rssFeed.rssEntries)
  @JoinColumn({ name: 'rss_feed_id' })
  rssFeed: RssFeed;

  @OneToOne(() => ScrapedArticle, (scrapedArticle) => scrapedArticle.rssEntry)
  scrapedArticle: ScrapedArticle;
}
