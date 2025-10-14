import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity('tags_hot_score', {
  materialized: true,
  expression: `
    WITH recent_activity AS (
      SELECT
        t.id as tag_id,
        COUNT(CASE WHEN a.created_at > now() - interval '6 hours' THEN 1 END) as articles_6h,
        COUNT(CASE WHEN a.created_at > now() - interval '24 hours' THEN 1 END) as articles_24h,
        COUNT(CASE WHEN a.created_at > now() - interval '7 days' THEN 1 END) as articles_7d,
        COUNT(CASE WHEN a.created_at > now() - interval '30 days' THEN 1 END) as articles_30d,
        MAX(a.created_at) as latest_article,
        COUNT(a.id) as total_articles
      FROM tags t
      LEFT JOIN article_tags at ON at.tag_id = t.id
      LEFT JOIN articles a ON a.id = at.article_id
      WHERE a.created_at IS NOT NULL
      GROUP BY t.id
    ),
    normalized AS (
      SELECT
        tag_id,
        -- Momentum score: recent articles with higher weight for more recent ones
        (articles_6h * 4.0 + articles_24h * 2.0 + articles_7d * 1.0 + articles_30d * 0.5) as momentum,
        -- Recency boost: exponential decay based on latest article
        CASE
          WHEN latest_article IS NOT NULL THEN
            1.0 / (1 + EXTRACT(EPOCH FROM (now() - latest_article))/3600)
          ELSE 0
        END as recency,
        -- Article volume: total articles (will be normalized later)
        total_articles::float as volume
      FROM recent_activity
      WHERE total_articles > 0 AND articles_30d > 0
    ),
    max_vals AS (
      SELECT
        MAX(momentum) AS max_momentum,
        MAX(recency) AS max_recency,
        MAX(volume) AS max_volume
      FROM normalized
    )
    SELECT
      n.tag_id,
      (0.5 * (CASE WHEN m.max_momentum > 0 THEN n.momentum / m.max_momentum ELSE 0 END)
       + 0.3 * (CASE WHEN m.max_recency > 0 THEN n.recency / m.max_recency ELSE 0 END)
       + 0.2 * (CASE WHEN m.max_volume > 0 THEN n.volume / m.max_volume ELSE 0 END)
      ) AS score
    FROM normalized n CROSS JOIN max_vals m
    WHERE (0.5 * (CASE WHEN m.max_momentum > 0 THEN n.momentum / m.max_momentum ELSE 0 END)
       + 0.3 * (CASE WHEN m.max_recency > 0 THEN n.recency / m.max_recency ELSE 0 END)
       + 0.2 * (CASE WHEN m.max_volume > 0 THEN n.volume / m.max_volume ELSE 0 END)
      ) > 0
  `
})
export class TagHotScore {
  @PrimaryColumn('int')
  tag_id: number;

  @ViewColumn()
  score: number;
}

