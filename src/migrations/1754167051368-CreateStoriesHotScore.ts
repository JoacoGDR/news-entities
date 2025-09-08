import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStoriesHotScore1754167051368 implements MigrationInterface {
    name = 'CreateStoriesHotScore1754167051368'

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Create normalized materialized view for stories_hot_score using avg(article.published_at) for recency
        // α = 0.50, β = 0.50 (articles_count, recency with equal weight)
        // Normalize articles_count, recency to [0,1]

        await queryRunner.query(`
            CREATE MATERIALIZED VIEW stories_hot_score AS
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
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
