import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticleTagsTable1700000000015 implements MigrationInterface {
    name = 'CreateArticleTagsTable1700000000015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "article_tags" (
                "article_id" integer NOT NULL,
                "tag_id" integer NOT NULL,
                CONSTRAINT "pk_article_tags" PRIMARY KEY ("article_id", "tag_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_article_tags_article_id" ON "article_tags" ("article_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_article_tags_tag_id" ON "article_tags" ("tag_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "article_tags"
            ADD CONSTRAINT "fk_article_tags_articles"
            FOREIGN KEY ("article_id") REFERENCES "articles"("id")
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "article_tags"
            ADD CONSTRAINT "fk_article_tags_tags"
            FOREIGN KEY ("tag_id") REFERENCES "tags"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_tags" DROP CONSTRAINT "fk_article_tags_tags"`);
        await queryRunner.query(`ALTER TABLE "article_tags" DROP CONSTRAINT "fk_article_tags_articles"`);
        await queryRunner.query(`DROP INDEX "ix_article_tags_tag_id"`);
        await queryRunner.query(`DROP INDEX "ix_article_tags_article_id"`);
        await queryRunner.query(`DROP TABLE "article_tags"`);
    }
}

