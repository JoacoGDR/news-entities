import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Fact } from './fact.entity';
import { Article } from './article.entity';
import { BaseEntity } from './base.entity';
import { StoryDevelopment } from './story-development.entity';
@Entity('stories')
export class Story extends BaseEntity {

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text', nullable: true, name: 'cover_image_url' })
  coverImageUrl: string | null;

  @Column({ type: 'int', default: 0, name: 'article_count' })
  articleCount: number;

  @ManyToMany(() => Article, (article) => article.stories)
  @JoinTable({
    name: 'story_articles',
    joinColumn: { name: 'story_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'article_id', referencedColumnName: 'id' },
  })
  articles: Article[];

  @ManyToMany(() => Fact, (fact) => fact.stories)
  @JoinTable({
    name: 'story_facts',
    joinColumn: { name: 'story_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fact_id', referencedColumnName: 'id' },
  })
  facts: Fact[];

  @OneToMany(() => StoryDevelopment, (storyDevelopment) => storyDevelopment.story)
  storyDevelopments: StoryDevelopment[];
}
