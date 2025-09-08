import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Story } from "./story.entity";

@Entity('story_developments')
export class StoryDevelopment extends BaseEntity {
  @ManyToOne(() => Story, (story) => story.storyDevelopments)
  @JoinColumn({ name: 'story_id' })
  story: Story;

  @Column({ type: 'varchar' })
  development: string;
}
