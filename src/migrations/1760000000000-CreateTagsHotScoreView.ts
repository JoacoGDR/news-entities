import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTagsHotScoreView1760000000000 implements MigrationInterface {
    name = 'CreateTagsHotScoreView1760000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE MATERIALIZED VIEW "tags_hot_score" AS
    WITH recent_activity AS (
      SELECT
        t.id as tag_id,
        COUNT(CASE WHEN s.created_at > now() - interval '6 hours' THEN 1 END) as stories_6h,
        COUNT(CASE WHEN s.created_at > now() - interval '24 hours' THEN 1 END) as stories_24h,
        COUNT(CASE WHEN s.created_at > now() - interval '7 days' THEN 1 END) as stories_7d,
        COUNT(CASE WHEN s.created_at > now() - interval '30 days' THEN 1 END) as stories_30d,
        MAX(s.created_at) as latest_story,
        COUNT(s.id) as total_stories
      FROM tags t
      LEFT JOIN story_tags st ON st.tag_id = t.id
      LEFT JOIN stories s ON s.id = st.story_id
      WHERE s.created_at IS NOT NULL
      GROUP BY t.id
    ),
    normalized AS (
      SELECT
        tag_id,
        -- Momentum score: recent stories with higher weight for more recent ones
        (stories_6h * 4.0 + stories_24h * 2.0 + stories_7d * 1.0 + stories_30d * 0.5) as momentum,
        -- Recency boost: exponential decay based on latest story
        CASE
          WHEN latest_story IS NOT NULL THEN
            1.0 / (1 + EXTRACT(EPOCH FROM (now() - latest_story))/3600)
          ELSE 0
        END as recency,
        -- Story volume: total stories (will be normalized later)
        total_stories::float as volume
      FROM recent_activity
      WHERE total_stories > 0 AND stories_30d > 0
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
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","MATERIALIZED_VIEW","tags_hot_score","WITH recent_activity AS (\n      SELECT\n        t.id as tag_id,\n        COUNT(CASE WHEN s.created_at > now() - interval '6 hours' THEN 1 END) as stories_6h,\n        COUNT(CASE WHEN s.created_at > now() - interval '24 hours' THEN 1 END) as stories_24h,\n        COUNT(CASE WHEN s.created_at > now() - interval '7 days' THEN 1 END) as stories_7d,\n        COUNT(CASE WHEN s.created_at > now() - interval '30 days' THEN 1 END) as stories_30d,\n        MAX(s.created_at) as latest_story,\n        COUNT(s.id) as total_stories\n      FROM tags t\n      LEFT JOIN story_tags st ON st.tag_id = t.id\n      LEFT JOIN stories s ON s.id = st.story_id\n      WHERE s.created_at IS NOT NULL\n      GROUP BY t.id\n    ),\n    normalized AS (\n      SELECT\n        tag_id,\n        -- Momentum score: recent stories with higher weight for more recent ones\n        (stories_6h * 4.0 + stories_24h * 2.0 + stories_7d * 1.0 + stories_30d * 0.5) as momentum,\n        -- Recency boost: exponential decay based on latest story\n        CASE\n          WHEN latest_story IS NOT NULL THEN\n            1.0 / (1 + EXTRACT(EPOCH FROM (now() - latest_story))/3600)\n          ELSE 0\n        END as recency,\n        -- Story volume: total stories (will be normalized later)\n        total_stories::float as volume\n      FROM recent_activity\n      WHERE total_stories > 0 AND stories_30d > 0\n    ),\n    max_vals AS (\n      SELECT\n        MAX(momentum) AS max_momentum,\n        MAX(recency) AS max_recency,\n        MAX(volume) AS max_volume\n      FROM normalized\n    )\n    SELECT\n      n.tag_id,\n      (0.5 * (CASE WHEN m.max_momentum > 0 THEN n.momentum / m.max_momentum ELSE 0 END)\n       + 0.3 * (CASE WHEN m.max_recency > 0 THEN n.recency / m.max_recency ELSE 0 END)\n       + 0.2 * (CASE WHEN m.max_volume > 0 THEN n.volume / m.max_volume ELSE 0 END)\n      ) AS score\n    FROM normalized n CROSS JOIN max_vals m\n    WHERE (0.5 * (CASE WHEN m.max_momentum > 0 THEN n.momentum / m.max_momentum ELSE 0 END)\n       + 0.3 * (CASE WHEN m.max_recency > 0 THEN n.recency / m.max_recency ELSE 0 END)\n       + 0.2 * (CASE WHEN m.max_volume > 0 THEN n.volume / m.max_volume ELSE 0 END)\n      ) > 0"]);
        await queryRunner.query(`CREATE INDEX "IDX_tags_hot_score_tag_id" ON "tags_hot_score" ("tag_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_tags_hot_score_tag_id"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["MATERIALIZED_VIEW","tags_hot_score","public"]);
        await queryRunner.query(`DROP MATERIALIZED VIEW "tags_hot_score"`);
    }

}

