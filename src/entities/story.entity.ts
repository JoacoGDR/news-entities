import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Fact } from './fact.entity';
import { Tag } from './tag.entity';
import { Article } from './article.entity';
import { BaseEntity } from './base.entity';

@Entity('stories')
export class Story extends BaseEntity {

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  summary: string;

  @ManyToMany(() => Article, (article) => article.stories)
  @JoinTable({
    name: 'story_articles',
    joinColumn: { name: 'story_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'article_id', referencedColumnName: 'id' },
  })
  articles: Article[];

  @ManyToMany(() => Tag, (tag) => tag.stories)
  @JoinTable({
    name: 'story_tags',
    joinColumn: { name: 'story_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => Fact, (fact) => fact.story)
  facts: Fact[];
}
