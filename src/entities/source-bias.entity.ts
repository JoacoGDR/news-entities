import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity('source_bias', {
  materialized: true,
  expression: `
    SELECT
      s.id as source_id,
      s.name as source_name,
      AVG(a.bias) as average_bias
    FROM sources s
    LEFT JOIN rss_feeds rf ON s.id = rf.source_id
    LEFT JOIN rss_entries re ON rf.id = re.rss_feed_id
    LEFT JOIN scraped_articles sa ON re.id = sa.rss_entry_id
    LEFT JOIN articles a ON sa.id = a.scraped_article_id
    WHERE a.bias IS NOT NULL
    GROUP BY s.id, s.name
    HAVING COUNT(a.id) > 0
  `
})
export class SourceBias {
  @PrimaryColumn('int')
  source_id: number;

  @ViewColumn()
  source_name: string;

  @ViewColumn()
  average_bias: number;
}
