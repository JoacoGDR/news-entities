import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRssFeedsTable1700000000003 implements MigrationInterface {
    name = 'CreateRssFeedsTable1700000000003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rss_feeds" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "url" character varying NOT NULL,
                "source_id" integer,
                CONSTRAINT "pk_rss_feeds" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX "ix_rss_feeds_url" ON "rss_feeds" ("url")
        `);

        await queryRunner.query(`
            ALTER TABLE "rss_feeds"
            ADD CONSTRAINT "fk_rss_feeds_sources"
            FOREIGN KEY ("source_id") REFERENCES "sources"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rss_feeds" DROP CONSTRAINT "fk_rss_feeds_sources"`);
        await queryRunner.query(`DROP INDEX "ix_rss_feeds_url"`);
        await queryRunner.query(`DROP TABLE "rss_feeds"`);
    }
}

