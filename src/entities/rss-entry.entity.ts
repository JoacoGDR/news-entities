import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Source } from './source.entity';
import { ScrapedArticle } from './scraped-article.entity';
import { BaseEntity } from './base.entity';

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

  @Column({ type: 'timestamp', name: 'fetched_at' })
  fetchedAt: Date;

  @Column({ type: 'boolean', name: 'is_enqueued', default: false })
  isEnqueued: boolean;

  @ManyToOne(() => Source, (source) => source.rssEntries)
  @JoinColumn({ name: 'source_id' })
  source: Source;

  @OneToOne(() => ScrapedArticle, (scrapedArticle) => scrapedArticle.rssEntry)
  scrapedArticle: ScrapedArticle;
}
