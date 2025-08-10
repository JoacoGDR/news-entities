import { Column, Entity, ManyToMany } from "typeorm";
import { Article } from "./article.entity";
import { BaseEntity } from "./base.entity";

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text'})
  description: string;

  @Column({ type: 'boolean', default: false, name: 'story_trigger' })
  storyTrigger: boolean;

  @ManyToMany(() => Article, (article) => article.categories)
  articles: Article[];
}
