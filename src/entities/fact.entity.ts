import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Story } from './story.entity';
import { Article } from './article.entity';
import { BaseEntity } from './base.entity';

@Entity('facts')
export class Fact extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'
  })
  embedding: string | null;

  @ManyToOne(() => Article, (article) => article.facts)
  @JoinColumn({ name: 'article_id' })
  article: Article;

  @ManyToMany(() => Story, (story) => story.facts)
  stories: Story[];
}
