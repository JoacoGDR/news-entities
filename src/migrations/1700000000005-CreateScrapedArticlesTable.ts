import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateScrapedArticlesTable1700000000005 implements MigrationInterface {
    name = 'CreateScrapedArticlesTable1700000000005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "scraped_articles" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying,
                "byline" character varying,
                "excerpt" text,
                "scraped_content" text NOT NULL,
                "rss_entry_id" integer,
                CONSTRAINT "uq_scraped_articles_rss_entry_id" UNIQUE ("rss_entry_id"),
                CONSTRAINT "pk_scraped_articles" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "scraped_articles"
            ADD CONSTRAINT "fk_scraped_articles_rss_entries"
            FOREIGN KEY ("rss_entry_id") REFERENCES "rss_entries"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scraped_articles" DROP CONSTRAINT "fk_scraped_articles_rss_entries"`);
        await queryRunner.query(`DROP TABLE "scraped_articles"`);
    }
}

