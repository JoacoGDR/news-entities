import {
  Entity,
  Column,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { ScrapedArticle } from './scraped-article.entity';
import { Story } from './story.entity';
import { Fact } from './fact.entity';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';

@Entity('articles')
export class Article extends BaseEntity {

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'varchar' })
  scope: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ 
    type: 'text',
    nullable: true,
    comment: 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'
  })
  embedding: string | null;

  @Column({ type: 'int', default: null, name: 'economic_bias' })
  economicBias: number | null;

  @Column({ type: 'int', default: null, name: 'social_bias' })
  socialBias: number | null;

  @Column({ type: 'int', default: null })
  sentiment: number | null;

  @OneToOne(() => ScrapedArticle, (scrapedArticle) => scrapedArticle.article)
  @JoinColumn({ name: 'scraped_article_id' })
  scrapedArticle: ScrapedArticle;

  @ManyToMany(() => Story, (story) => story.articles)
  stories: Story[];

  @ManyToMany(() => Fact, (fact) => fact.articles)
  @JoinTable({
    name: 'article_facts',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fact_id', referencedColumnName: 'id' },
  })
  facts: Fact[];

  @ManyToMany(() => Category, (category) => category.articles)
  @JoinTable({
    name: 'article_categories',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
