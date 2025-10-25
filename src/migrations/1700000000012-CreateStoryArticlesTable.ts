import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStoryArticlesTable1700000000012 implements MigrationInterface {
    name = 'CreateStoryArticlesTable1700000000012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "story_articles" (
                "story_id" integer NOT NULL,
                "article_id" integer NOT NULL,
                CONSTRAINT "pk_story_articles" PRIMARY KEY ("story_id", "article_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_story_articles_story_id" ON "story_articles" ("story_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_story_articles_article_id" ON "story_articles" ("article_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "story_articles"
            ADD CONSTRAINT "fk_story_articles_stories"
            FOREIGN KEY ("story_id") REFERENCES "stories"("id")
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "story_articles"
            ADD CONSTRAINT "fk_story_articles_articles"
            FOREIGN KEY ("article_id") REFERENCES "articles"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_articles" DROP CONSTRAINT "fk_story_articles_articles"`);
        await queryRunner.query(`ALTER TABLE "story_articles" DROP CONSTRAINT "fk_story_articles_stories"`);
        await queryRunner.query(`DROP INDEX "ix_story_articles_article_id"`);
        await queryRunner.query(`DROP INDEX "ix_story_articles_story_id"`);
        await queryRunner.query(`DROP TABLE "story_articles"`);
    }
}

