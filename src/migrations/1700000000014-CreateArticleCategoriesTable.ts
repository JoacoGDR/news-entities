import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticleCategoriesTable1700000000014 implements MigrationInterface {
    name = 'CreateArticleCategoriesTable1700000000014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "article_categories" (
                "article_id" integer NOT NULL,
                "category_id" integer NOT NULL,
                CONSTRAINT "pk_article_categories" PRIMARY KEY ("article_id", "category_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_article_categories_article_id" ON "article_categories" ("article_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_article_categories_category_id" ON "article_categories" ("category_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "article_categories"
            ADD CONSTRAINT "fk_article_categories_articles"
            FOREIGN KEY ("article_id") REFERENCES "articles"("id")
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "article_categories"
            ADD CONSTRAINT "fk_article_categories_categories"
            FOREIGN KEY ("category_id") REFERENCES "categories"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_categories" DROP CONSTRAINT "fk_article_categories_categories"`);
        await queryRunner.query(`ALTER TABLE "article_categories" DROP CONSTRAINT "fk_article_categories_articles"`);
        await queryRunner.query(`DROP INDEX "ix_article_categories_category_id"`);
        await queryRunner.query(`DROP INDEX "ix_article_categories_article_id"`);
        await queryRunner.query(`DROP TABLE "article_categories"`);
    }
}

