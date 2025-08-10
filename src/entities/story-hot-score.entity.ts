import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity('stories_hot_score', { materialized: true })
export class StoryHotScore {
  @PrimaryColumn('int')
  story_id: number;

  @ViewColumn()
  score: number;
}
