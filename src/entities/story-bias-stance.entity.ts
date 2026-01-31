import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Story } from './story.entity';

export type BiasGroup = 'left' | 'center' | 'right';

@Entity('story_bias_stances')
export class StoryBiasStance extends BaseEntity {
  @Column({ type: 'varchar', name: 'bias_group' })
  biasGroup: BiasGroup;

  @Column({ type: 'text' })
  stance: string;

  @Column({ type: 'int', name: 'article_count' })
  articleCount: number;

  @ManyToOne(() => Story, (story) => story.biasStances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'story_id' })
  story: Story;
}
