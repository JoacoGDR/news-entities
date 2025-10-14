import {
  Entity,
  Column,
  ManyToMany,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Article } from './article.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column({ type: 'varchar' })
  @Index({ unique: true })
  name: string;

  @Column({ type: 'varchar', name: 'normalized_name' })
  @Index({ unique: true })
  normalizedName: string;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
