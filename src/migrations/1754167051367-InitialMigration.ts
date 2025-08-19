import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754167051367 implements MigrationInterface {
    name = 'InitialMigration1754167051367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Enable vector extension for embedding support
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);

        // Create sources table
        await queryRunner.query(`
            CREATE TABLE "sources" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "domain" character varying NOT NULL,
                "location" character varying NOT NULL,
                "last_fetched_at" TIMESTAMP,
                CONSTRAINT "PK_sources_id" PRIMARY KEY ("id")
            )
        `);

        // Create unique index on sources name
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_sources_name" ON "sources" ("name")
        `);

        // Create rss_feeds table
        await queryRunner.query(`
            CREATE TABLE "rss_feeds" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "url" character varying UNIQUE NOT NULL,
                "source_id" integer,
                CONSTRAINT "PK_rss_feeds_id" PRIMARY KEY ("id")
            )
        `);

        // Create rss_entries table
        await queryRunner.query(`
            CREATE TABLE "rss_entries" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "description" text,
                "url" character varying NOT NULL,
                "published_at" TIMESTAMP NOT NULL,
                "fetched_at" TIMESTAMP NOT NULL,
                "is_enqueued" boolean NOT NULL DEFAULT false,
                "rss_feed_id" integer REFERENCES "rss_feeds"("id") ON DELETE CASCADE,
                CONSTRAINT "PK_rss_entries_id" PRIMARY KEY ("id")
            )
        `);

        // Create unique index on rss_entries url
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_rss_entries_url" ON "rss_entries" ("url")
        `);

        // Create scraped_articles table
        await queryRunner.query(`
            CREATE TABLE "scraped_articles" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying,
                "byline" character varying,
                "excerpt" text,
                "scraped_content" text NOT NULL,
                "scraped_at" TIMESTAMP NOT NULL,
                "rss_entry_id" integer,
                CONSTRAINT "PK_scraped_articles_id" PRIMARY KEY ("id")
            )
        `);

        // Create stories table
        await queryRunner.query(`
            CREATE TABLE "stories" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "urgency" integer NOT NULL DEFAULT 1,
                "title" character varying NOT NULL,
                "summary" text NOT NULL,
                CONSTRAINT "PK_stories_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_stories_urgency" ON "stories" ("urgency")
        `);

        // Create facts table with vector embedding
        await queryRunner.query(`
            CREATE TABLE "facts" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "content" text NOT NULL,
                "embedding" vector(1536),
                "story_id" integer,
                CONSTRAINT "PK_facts_id" PRIMARY KEY ("id")
            )
        `);

        // Add comment on facts embedding column
        await queryRunner.query(`
            COMMENT ON COLUMN "facts"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'
        `);

        // Create tags table with vector embedding
        await queryRunner.query(`
            CREATE TABLE "tags" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "normalized_name" character varying NOT NULL,
                CONSTRAINT "PK_tags_id" PRIMARY KEY ("id")
            )
        `);

        // Create unique index on tags name
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_tags_name" ON "tags" ("name")
        `);

        // Create unique index on tags normalized_name
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_tags_normalized_name" ON "tags" ("normalized_name")
        `);

        // Create categories table
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "description" text NOT NULL,
                "story_trigger" boolean NOT NULL DEFAULT false,
                CONSTRAINT "UQ_categories_name" UNIQUE ("name"),
                CONSTRAINT "PK_categories_id" PRIMARY KEY ("id")
            )
        `);

        // Create articles table with vector embedding
        await queryRunner.query(`
            CREATE TABLE "articles" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "summary" text NOT NULL,
                "scope" character varying NOT NULL,
                "type" character varying NOT NULL,
                "embedding" vector(1536),
                "economic_bias" integer,
                "social_bias" integer,
                "sentiment" integer,
                "scraped_article_id" integer,
                CONSTRAINT "REL_417f2d5fec6a11a763729f994a" UNIQUE ("scraped_article_id"),
                CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id")
            )
        `);

        // Index to speed up queries on articles.created_at
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_articles_created_at" ON "articles" ("created_at")
        `);

        // Add comment on articles embedding column
        await queryRunner.query(`
            COMMENT ON COLUMN "articles"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'
        `);

        // Create junction table for story-articles many-to-many relationship
        await queryRunner.query(`
            CREATE TABLE "story_articles" (
                "story_id" integer NOT NULL,
                "article_id" integer NOT NULL,
                CONSTRAINT "PK_ced9562eb65f2218a9a345aed45" PRIMARY KEY ("story_id", "article_id")
            )
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_story_articles_story_id_article_id" ON "story_articles" ("story_id", "article_id")
        `);

        // Create indexes for story_articles junction table
        await queryRunner.query(`
            CREATE INDEX "IDX_story_articles_story_id" ON "story_articles" ("story_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_story_articles_article_id" ON "story_articles" ("article_id")
        `);

        // Create junction table for story-tags many-to-many relationship
        await queryRunner.query(`
            CREATE TABLE "story_tags" (
                "story_id" integer NOT NULL,
                "tag_id" integer NOT NULL,
                CONSTRAINT "PK_e1ec4350081fa242b2d34b44e03" PRIMARY KEY ("story_id", "tag_id")
            )
        `);

        // Create indexes for story_tags junction table
        await queryRunner.query(`
            CREATE INDEX "IDX_story_tags_story_id" ON "story_tags" ("story_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_story_tags_tag_id" ON "story_tags" ("tag_id")
        `);

        // Create junction table for article-facts many-to-many relationship
        await queryRunner.query(`
            CREATE TABLE "article_facts" (
                "article_id" integer NOT NULL,
                "fact_id" integer NOT NULL,
                CONSTRAINT "PK_e76932c7b45041deff4b0f328ee" PRIMARY KEY ("article_id", "fact_id")
            )
        `);

        // Create indexes for article_facts junction table
        await queryRunner.query(`
            CREATE INDEX "IDX_article_facts_article_id" ON "article_facts" ("article_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_article_facts_fact_id" ON "article_facts" ("fact_id")
        `);

        // Create junction table for article-categories many-to-many relationship
        await queryRunner.query(`
            CREATE TABLE "article_categories" (
                "article_id" integer NOT NULL,
                "category_id" integer NOT NULL,
                CONSTRAINT "PK_52a14b5c9d57f91198335fa5e9d" PRIMARY KEY ("article_id", "category_id")
            )
        `);

        // Create indexes for article_categories junction table
        await queryRunner.query(`
            CREATE INDEX "IDX_article_categories_article_id" ON "article_categories" ("article_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_article_categories_category_id" ON "article_categories" ("category_id")
        `);

        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "rss_feeds" 
            ADD CONSTRAINT "FK_689e63230bd06ad2fc129b9ca0f" 
            FOREIGN KEY ("source_id") REFERENCES "sources"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "scraped_articles" 
            ADD CONSTRAINT "FK_f19919a4345508c18853edc9da9" 
            FOREIGN KEY ("rss_entry_id") REFERENCES "rss_entries"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "facts" 
            ADD CONSTRAINT "FK_f1fed3628488572384d959be64e" 
            FOREIGN KEY ("story_id") REFERENCES "stories"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "articles" 
            ADD CONSTRAINT "FK_417f2d5fec6a11a763729f994af" 
            FOREIGN KEY ("scraped_article_id") REFERENCES "scraped_articles"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "story_articles" 
            ADD CONSTRAINT "FK_350dbafe1abfab5dff7ff13b12f" 
            FOREIGN KEY ("story_id") REFERENCES "stories"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "story_articles" 
            ADD CONSTRAINT "FK_836ba49984374440dd9b2cd55af" 
            FOREIGN KEY ("article_id") REFERENCES "articles"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "story_tags" 
            ADD CONSTRAINT "FK_818bd0326f1417b77cb55f0b80f" 
            FOREIGN KEY ("story_id") REFERENCES "stories"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "story_tags" 
            ADD CONSTRAINT "FK_24edf1076b3af707856d5fcccd3" 
            FOREIGN KEY ("tag_id") REFERENCES "tags"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "article_facts" 
            ADD CONSTRAINT "FK_00c6e9634f4c42a68e06a2adef7" 
            FOREIGN KEY ("article_id") REFERENCES "articles"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "article_facts" 
            ADD CONSTRAINT "FK_28240cc682f15437842015287bc" 
            FOREIGN KEY ("fact_id") REFERENCES "facts"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "article_categories" 
            ADD CONSTRAINT "FK_6919cd26646fd24f7aac8166d46" 
            FOREIGN KEY ("article_id") REFERENCES "articles"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "article_categories" 
            ADD CONSTRAINT "FK_2074448c3764e149b3b0541c2a7" 
            FOREIGN KEY ("category_id") REFERENCES "categories"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        // Create normalized materialized view for stories_hot_score using avg(article.published_at) for recency
        // α = 0.33, β = 0.33, γ = 0.34 (articles_count, recency, urgency with equal weight)
        // Normalize articles_count, recency, and urgency to [0,1]

        await queryRunner.query(`
            CREATE MATERIALIZED VIEW stories_hot_score AS
            WITH base AS (
                SELECT
                    s.id AS story_id,
                    COUNT(a.id) AS articles_count,
                    (1.0 / (1 + (EXTRACT(EPOCH FROM (now() - to_timestamp(AVG(EXTRACT(EPOCH FROM re.published_at)))))/3600))) AS recency,
                    s.urgency::FLOAT AS urgency
                FROM stories s
                LEFT JOIN story_articles sa ON sa.story_id = s.id
                LEFT JOIN articles a ON a.id = sa.article_id
                LEFT JOIN scraped_articles sa2 ON a.scraped_article_id = sa2.id
                LEFT JOIN rss_entries re ON sa2.rss_entry_id = re.id
                GROUP BY s.id, s.urgency
            ),
            max_vals AS (
                SELECT 
                    MAX(articles_count) AS max_articles, 
                    MAX(recency) AS max_recency,
                    MAX(urgency) AS max_urgency
                FROM base
            )
            SELECT
                b.story_id,
                (0.33 * (CASE WHEN m.max_articles > 0 THEN b.articles_count / m.max_articles ELSE 0 END)
                 + 0.33 * (CASE WHEN m.max_recency > 0 THEN b.recency / m.max_recency ELSE 0 END)
                 + 0.34 * (CASE WHEN m.max_urgency > 0 THEN b.urgency / m.max_urgency ELSE 0 END)) AS score
            FROM base b CROSS JOIN max_vals m
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
