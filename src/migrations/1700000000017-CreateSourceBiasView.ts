import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSourceBiasView1700000000017 implements MigrationInterface {
    name = 'CreateSourceBiasView1700000000017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE MATERIALIZED VIEW "source_bias" AS
    SELECT
      s.id as source_id,
      s.name as source_name,
      SUM(a.bias * CASE
        WHEN a.bias = 0 THEN 0.10
        ELSE 1.0
      END) / SUM(CASE
        WHEN a.bias = 0 THEN 0.10
        ELSE 1.0
      END) as average_bias
    FROM sources s
    LEFT JOIN rss_feeds rf ON s.id = rf.source_id
    LEFT JOIN rss_entries re ON rf.id = re.rss_feed_id
    LEFT JOIN scraped_articles sa ON re.id = sa.rss_entry_id
    LEFT JOIN articles a ON sa.id = a.scraped_article_id
    WHERE a.bias IS NOT NULL
    GROUP BY s.id, s.name
    HAVING COUNT(a.id) > 0
  `);
        await queryRunner.query(`CREATE INDEX ix_source_bias_source_id ON source_bias (source_id);`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","MATERIALIZED_VIEW","source_bias","SELECT\n      s.id as source_id,\n      s.name as source_name,\n      SUM(a.bias * CASE\n        WHEN a.bias = 0 THEN 0.10\n        ELSE 1.0\n      END) / SUM(CASE\n        WHEN a.bias = 0 THEN 0.10\n        ELSE 1.0\n      END) as average_bias\n    FROM sources s\n    LEFT JOIN rss_feeds rf ON s.id = rf.source_id\n    LEFT JOIN rss_entries re ON rf.id = re.rss_feed_id\n    LEFT JOIN scraped_articles sa ON re.id = sa.rss_entry_id\n    LEFT JOIN articles a ON sa.id = a.scraped_article_id\n    WHERE a.bias IS NOT NULL\n    GROUP BY s.id, s.name\n    HAVING COUNT(a.id) > 0"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX ix_source_bias_source_id;`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["MATERIALIZED_VIEW","source_bias","public"]);
        await queryRunner.query(`DROP MATERIALIZED VIEW "source_bias"`);
    }
}

