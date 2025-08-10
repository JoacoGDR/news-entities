import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RssEntry } from './rss-entry.entity';
import { Article } from './article.entity';
import { BaseEntity } from './base.entity';

@Entity('scraped_articles')
export class ScrapedArticle extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  byline: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column({ type: 'text', name: 'scraped_content' })
  scrapedContent: string;

  @Column({ type: 'timestamp', name: 'scraped_at' })
  scrapedAt: Date;

  @OneToOne(() => RssEntry, (rssEntry) => rssEntry.scrapedArticle)
  @JoinColumn({ name: 'rss_entry_id' })
  rssEntry: RssEntry;

  @OneToOne(() => Article, (article) => article.scrapedArticle)
  article: Article;
}
