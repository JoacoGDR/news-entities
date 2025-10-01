import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity('stories_hot_score', {
  materialized: true,
  expression: `
    WITH recent_activity AS (
      SELECT
        s.id as story_id,
        COUNT(CASE WHEN re.published_at > now() - interval '6 hours' THEN 1 END) as articles_6h,
        COUNT(CASE WHEN re.published_at > now() - interval '24 hours' THEN 1 END) as articles_24h,
        COUNT(CASE WHEN re.published_at > now() - interval '7 days' THEN 1 END) as articles_7d,
        COUNT(DISTINCT rf.source_id) as unique_sources,
        MAX(re.published_at) as latest_article,
        COUNT(a.id) as total_articles
      FROM stories s
      LEFT JOIN story_articles sa ON sa.story_id = s.id
      LEFT JOIN articles a ON a.id = sa.article_id
      LEFT JOIN scraped_articles sa2 ON a.scraped_article_id = sa2.id
      LEFT JOIN rss_entries re ON sa2.rss_entry_id = re.id
      LEFT JOIN rss_feeds rf ON re.rss_feed_id = rf.id
      WHERE re.published_at IS NOT NULL
      GROUP BY s.id
    ),
    normalized AS (
      SELECT
        story_id,
        -- Momentum score: recent articles with higher weight for more recent ones
        (articles_6h * 3.0 + articles_24h * 1.0 + articles_7d * 0.3) as momentum,
        -- Source diversity: normalize against total source count
        LEAST(unique_sources::float / (SELECT COUNT(*)::float FROM sources), 1.0) as diversity,
        -- Recency boost: exponential decay based on latest article
        CASE
          WHEN latest_article IS NOT NULL THEN
            1.0 / (1 + EXTRACT(EPOCH FROM (now() - latest_article))/3600)
          ELSE 0
        END as recency
      FROM recent_activity
      WHERE total_articles > 0
    ),
    max_vals AS (
      SELECT
        MAX(momentum) AS max_momentum,
        MAX(diversity) AS max_diversity,
        MAX(recency) AS max_recency
      FROM normalized
    )
    SELECT
      n.story_id,
      (0.6 * (CASE WHEN m.max_momentum > 0 THEN n.momentum / m.max_momentum ELSE 0 END)
       + 0.2 * (CASE WHEN m.max_diversity > 0 THEN n.diversity / m.max_diversity ELSE 0 END)
       + 0.2 * (CASE WHEN m.max_recency > 0 THEN n.recency / m.max_recency ELSE 0 END)
      ) AS score
    FROM normalized n CROSS JOIN max_vals m
  `
})
export class StoryHotScore {
  @PrimaryColumn('int')
  story_id: number;

  @ViewColumn()
  score: number;
}
