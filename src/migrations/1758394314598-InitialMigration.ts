import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1758394314598 implements MigrationInterface {
    name = 'InitialMigration1758394314598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);
        await queryRunner.query(`CREATE TABLE "sources" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "domain" character varying NOT NULL, "location" character varying NOT NULL, "last_fetched_at" TIMESTAMP, CONSTRAINT "UQ_ee4027d72bd2c0c01c4d1fc1109" UNIQUE ("name"), CONSTRAINT "PK_85523beafe5a2a6b90b02096443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rss_feeds" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, "source_id" integer, CONSTRAINT "PK_45d096d7ff81874f17f4b089d3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rss_entries" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text, "url" character varying NOT NULL, "published_at" TIMESTAMP NOT NULL, "fetched_at" TIMESTAMP NOT NULL, "is_enqueued" boolean NOT NULL DEFAULT false, "rss_feed_id" integer, CONSTRAINT "PK_3340c59b85ddc30bc29528d29a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_744e2fdad0ccbb5bda6226beba" ON "rss_entries" ("url") `);
        await queryRunner.query(`CREATE TABLE "scraped_articles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "byline" character varying, "excerpt" text, "scraped_content" text NOT NULL, "scraped_at" TIMESTAMP NOT NULL, "rss_entry_id" integer, CONSTRAINT "REL_cd92c38cf94b5a1788e9dd6eb9" UNIQUE ("rss_entry_id"), CONSTRAINT "PK_bd33847a79774b4e054cd9e2ea9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "facts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "article_id" integer, CONSTRAINT "PK_b35218a44dc3d5dd2f0f54d7e3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "normalized_name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d90243459a697eadb8ad56e909" ON "tags" ("name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ec6d380fcb53d205643cf38497" ON "tags" ("normalized_name") `);
        await queryRunner.query(`CREATE TABLE "story_developments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "development" character varying NOT NULL, "story_id" integer, CONSTRAINT "PK_ecc6423de2ea48bf753238c0c9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "summary" text NOT NULL, "cover_image_url" text, CONSTRAINT "PK_bb6f880b260ed96c452b32a39f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text NOT NULL, "story_trigger" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "summary" text NOT NULL, "scope" character varying NOT NULL, "type" character varying NOT NULL, "embedding" vector(1536), "bias" integer, "sentiment" integer, "scraped_article_id" integer, CONSTRAINT "REL_90503785b13ac487bcf42ea788" UNIQUE ("scraped_article_id"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id")); COMMENT ON COLUMN "articles"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'`);
        await queryRunner.query(`CREATE TABLE "story_articles" ("story_id" integer NOT NULL, "article_id" integer NOT NULL, CONSTRAINT "PK_ced9562eb65f2218a9a345aed45" PRIMARY KEY ("story_id", "article_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_350dbafe1abfab5dff7ff13b12" ON "story_articles" ("story_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_836ba49984374440dd9b2cd55a" ON "story_articles" ("article_id") `);
        await queryRunner.query(`CREATE TABLE "story_tags" ("story_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_e1ec4350081fa242b2d34b44e03" PRIMARY KEY ("story_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_818bd0326f1417b77cb55f0b80" ON "story_tags" ("story_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_24edf1076b3af707856d5fcccd" ON "story_tags" ("tag_id") `);
        await queryRunner.query(`CREATE TABLE "story_facts" ("story_id" integer NOT NULL, "fact_id" integer NOT NULL, CONSTRAINT "PK_4791906b683a27244e12f739496" PRIMARY KEY ("story_id", "fact_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_780949f33e74ee03a57a97ef7e" ON "story_facts" ("story_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ba198731796464155c5afa6169" ON "story_facts" ("fact_id") `);
        await queryRunner.query(`CREATE TABLE "article_categories" ("article_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_52a14b5c9d57f91198335fa5e9d" PRIMARY KEY ("article_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6919cd26646fd24f7aac8166d4" ON "article_categories" ("article_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2074448c3764e149b3b0541c2a" ON "article_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "rss_feeds" ADD CONSTRAINT "FK_1a4820af322e18e7ab695acffb5" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rss_entries" ADD CONSTRAINT "FK_5e1932e69f13d0b79430c34841d" FOREIGN KEY ("rss_feed_id") REFERENCES "rss_feeds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scraped_articles" ADD CONSTRAINT "FK_cd92c38cf94b5a1788e9dd6eb9e" FOREIGN KEY ("rss_entry_id") REFERENCES "rss_entries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "facts" ADD CONSTRAINT "FK_d6f26b4fd5b692e5fba95235221" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "story_developments" ADD CONSTRAINT "FK_a22e491552a6a4fa05493762e02" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_90503785b13ac487bcf42ea788e" FOREIGN KEY ("scraped_article_id") REFERENCES "scraped_articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "story_articles" ADD CONSTRAINT "FK_350dbafe1abfab5dff7ff13b12f" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "story_articles" ADD CONSTRAINT "FK_836ba49984374440dd9b2cd55af" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "story_tags" ADD CONSTRAINT "FK_818bd0326f1417b77cb55f0b80f" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "story_tags" ADD CONSTRAINT "FK_24edf1076b3af707856d5fcccd3" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "story_facts" ADD CONSTRAINT "FK_780949f33e74ee03a57a97ef7ed" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "story_facts" ADD CONSTRAINT "FK_ba198731796464155c5afa6169a" FOREIGN KEY ("fact_id") REFERENCES "facts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_categories" ADD CONSTRAINT "FK_6919cd26646fd24f7aac8166d46" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_categories" ADD CONSTRAINT "FK_2074448c3764e149b3b0541c2a7" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE MATERIALIZED VIEW "stories_hot_score" AS
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
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","MATERIALIZED_VIEW","stories_hot_score","WITH base AS (\n      SELECT\n        s.id AS story_id,\n        COUNT(a.id) AS articles_count,\n        (1.0 / (1 + (EXTRACT(EPOCH FROM (now() - to_timestamp(AVG(EXTRACT(EPOCH FROM re.published_at)))))/3600))) AS recency\n      FROM stories s\n      LEFT JOIN story_articles sa ON sa.story_id = s.id\n      LEFT JOIN articles a ON a.id = sa.article_id\n      LEFT JOIN scraped_articles sa2 ON a.scraped_article_id = sa2.id\n      LEFT JOIN rss_entries re ON sa2.rss_entry_id = re.id\n      GROUP BY s.id\n    ),\n    max_vals AS (\n      SELECT\n        MAX(articles_count) AS max_articles,\n        MAX(recency) AS max_recency\n      FROM base\n    )\n    SELECT\n      b.story_id,\n      (0.50 * (CASE WHEN m.max_articles > 0 THEN b.articles_count / m.max_articles ELSE 0 END)\n       + 0.50 * (CASE WHEN m.max_recency > 0 THEN b.recency / m.max_recency ELSE 0 END)\n      ) AS score\n    FROM base b CROSS JOIN max_vals m"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
