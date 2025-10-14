import { MigrationInterface, QueryRunner } from "typeorm";

export class LinkTagsToArticles1760410565726 implements MigrationInterface {
    name = 'LinkTagsToArticles1760410565726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_tags_hot_score_tag_id"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["MATERIALIZED_VIEW","tags_hot_score","public"]);
        await queryRunner.query(`DROP MATERIALIZED VIEW IF EXISTS "tags_hot_score"`);

        await queryRunner.query(`DROP TABLE IF EXISTS "story_tags"`);

        await queryRunner.query(`CREATE TABLE "article_tags" ("article_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_dd79accc42e2f122f6f3ff7588a" PRIMARY KEY ("article_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8c9234a4c4cb37806387f0c9e" ON "article_tags" ("article_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1325dd0b98ee0f8f673db6ce19" ON "article_tags" ("tag_id") `);

        await queryRunner.query(`ALTER TABLE "article_tags" ADD CONSTRAINT "FK_f8c9234a4c4cb37806387f0c9e9" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_tags" ADD CONSTRAINT "FK_1325dd0b98ee0f8f673db6ce194" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`CREATE MATERIALIZED VIEW "tags_hot_score" AS
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
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","MATERIALIZED_VIEW","tags_hot_score","WITH recent_activity AS (\n      SELECT\n        t.id as tag_id,\n        COUNT(CASE WHEN a.created_at > now() - interval '6 hours' THEN 1 END) as articles_6h,\n        COUNT(CASE WHEN a.created_at > now() - interval '24 hours' THEN 1 END) as articles_24h,\n        COUNT(CASE WHEN a.created_at > now() - interval '7 days' THEN 1 END) as articles_7d,\n        COUNT(CASE WHEN a.created_at > now() - interval '30 days' THEN 1 END) as articles_30d,\n        MAX(a.created_at) as latest_article,\n        COUNT(a.id) as total_articles\n      FROM tags t\n      LEFT JOIN article_tags at ON at.tag_id = t.id\n      LEFT JOIN articles a ON a.id = at.article_id\n      WHERE a.created_at IS NOT NULL\n      GROUP BY t.id\n    ),\n    normalized AS (\n      SELECT\n        tag_id,\n        -- Momentum score: recent articles with higher weight for more recent ones\n        (articles_6h * 4.0 + articles_24h * 2.0 + articles_7d * 1.0 + articles_30d * 0.5) as momentum,\n        -- Recency boost: exponential decay based on latest article\n        CASE\n          WHEN latest_article IS NOT NULL THEN\n            1.0 / (1 + EXTRACT(EPOCH FROM (now() - latest_article))/3600)\n          ELSE 0\n        END as recency,\n        -- Article volume: total articles (will be normalized later)\n        total_articles::float as volume\n      FROM recent_activity\n      WHERE total_articles > 0 AND articles_30d > 0\n    ),\n    max_vals AS (\n      SELECT\n        MAX(momentum) AS max_momentum,\n        MAX(recency) AS max_recency,\n        MAX(volume) AS max_volume\n      FROM normalized\n    )\n    SELECT\n      n.tag_id,\n      (0.5 * (CASE WHEN m.max_momentum > 0 THEN n.momentum / m.max_momentum ELSE 0 END)\n       + 0.3 * (CASE WHEN m.max_recency > 0 THEN n.recency / m.max_recency ELSE 0 END)\n       + 0.2 * (CASE WHEN m.max_volume > 0 THEN n.volume / m.max_volume ELSE 0 END)\n      ) AS score\n    FROM normalized n CROSS JOIN max_vals m\n    WHERE (0.5 * (CASE WHEN m.max_momentum > 0 THEN n.momentum / m.max_momentum ELSE 0 END)\n       + 0.3 * (CASE WHEN m.max_recency > 0 THEN n.recency / m.max_recency ELSE 0 END)\n       + 0.2 * (CASE WHEN m.max_volume > 0 THEN n.volume / m.max_volume ELSE 0 END)\n      ) > 0"]);
        await queryRunner.query(`CREATE INDEX "IDX_tags_hot_score_tag_id" ON "tags_hot_score" ("tag_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
