import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticlesTable1700000000010 implements MigrationInterface {
    name = 'CreateArticlesTable1700000000010'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
                "bias" integer,
                "biasReason" text,
                "scraped_article_id" integer,
                CONSTRAINT "uq_articles_scraped_article_id" UNIQUE ("scraped_article_id"),
                CONSTRAINT "pk_articles" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "articles"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'
        `);
        await queryRunner.query(`
            ALTER TABLE "articles"
            ADD CONSTRAINT "fk_articles_scraped_articles"
            FOREIGN KEY ("scraped_article_id") REFERENCES "scraped_articles"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_articles_bias" ON "articles" ("bias")
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_articles_scope" ON "articles" ("scope")
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_articles_created_at" ON "articles" ("created_at")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "ix_articles_created_at"`);
        await queryRunner.query(`DROP INDEX "ix_articles_scope"`);
        await queryRunner.query(`DROP INDEX "ix_articles_bias"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "fk_articles_scraped_articles"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }
}

