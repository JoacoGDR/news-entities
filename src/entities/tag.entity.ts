import {
  Entity,
  Column,
  ManyToMany,
  Index,
} from 'typeorm';
import { Story } from './story.entity';
import { BaseEntity } from './base.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column({ type: 'varchar' })
  @Index({ unique: true })
  name: string;

  @Column({ type: 'varchar', name: 'normalized_name' })
  @Index({ unique: true })
  normalizedName: string;

  @ManyToMany(() => Story, (story) => story.tags)
  stories: Story[];
}
