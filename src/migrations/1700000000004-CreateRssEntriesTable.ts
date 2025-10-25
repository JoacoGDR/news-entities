import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRssEntriesTable1700000000004 implements MigrationInterface {
    name = 'CreateRssEntriesTable1700000000004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rss_entries" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "description" text,
                "url" character varying NOT NULL,
                "published_at" TIMESTAMP NOT NULL DEFAULT now(),
                "rss_feed_id" integer,
                CONSTRAINT "pk_rss_entries" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX "ix_rss_entries_url" ON "rss_entries" ("url")
        `);

        await queryRunner.query(`
            CREATE INDEX "ix_rss_entries_published_at" ON "rss_entries" ("published_at")
        `);

        await queryRunner.query(`
            ALTER TABLE "rss_entries"
            ADD CONSTRAINT "fk_rss_entries_rss_feeds"
            FOREIGN KEY ("rss_feed_id") REFERENCES "rss_feeds"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "ix_rss_entries_published_at"`);
        await queryRunner.query(`ALTER TABLE "rss_entries" DROP CONSTRAINT "fk_rss_entries_rss_feeds"`);
        await queryRunner.query(`DROP INDEX "ix_rss_entries_url"`);
        await queryRunner.query(`DROP TABLE "rss_entries"`);
    }
}

