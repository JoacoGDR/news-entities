import {
  Entity,
  Column,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
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
  })
  embedding: string | null;

  @Column({ type: 'int', default: null})
  bias: number | null;

  @Column({ type: 'text', nullable: true})
  biasReason: string | null;

  @OneToOne(() => ScrapedArticle, (scrapedArticle) => scrapedArticle.article)
  @JoinColumn({ name: 'scraped_article_id' })
  scrapedArticle: ScrapedArticle;

  @ManyToMany(() => Story, (story) => story.articles)
  stories: Story[];

  @OneToMany(() => Fact, (fact) => fact.article)
  facts: Fact[];

  @ManyToMany(() => Category, (category) => category.articles)
  @JoinTable({
    name: 'article_categories',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
