import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity('stories_hot_score', {
  materialized: true,
  expression: `
    WITH base AS (
      SELECT
        s.id AS story_id,
        COUNT(a.id) AS articles_count,
        (1.0 / (1 + (EXTRACT(EPOCH FROM (now() - to_timestamp(AVG(EXTRACT(EPOCH FROM re.published_at)))))/3600))) AS recency
      FROM stories s
      LEFT JOIN story_articles sa ON sa.story_id = s.id
      LEFT JOIN articles a ON a.id = sa.article_id
      LEFT JOIN scraped_articles sa2 ON a.scraped_article_id = sa2.id
      LEFT JOIN rss_entries re ON sa2.rss_entry_id = re.id
      GROUP BY s.id
    ),
    max_vals AS (
      SELECT
        MAX(articles_count) AS max_articles,
        MAX(recency) AS max_recency
      FROM base
    )
    SELECT
      b.story_id,
      (0.50 * (CASE WHEN m.max_articles > 0 THEN b.articles_count / m.max_articles ELSE 0 END)
       + 0.50 * (CASE WHEN m.max_recency > 0 THEN b.recency / m.max_recency ELSE 0 END)
      ) AS score
    FROM base b CROSS JOIN max_vals m
  `
})
export class StoryHotScore {
  @PrimaryColumn('int')
  story_id: number;

  @ViewColumn()
  score: number;
}
