import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFactsTable1700000000011 implements MigrationInterface {
    name = 'CreateFactsTable1700000000011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "facts" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "content" text NOT NULL,
                "embedding" vector(1536),
                "article_id" integer,
                CONSTRAINT "pk_facts" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "facts"
            ADD CONSTRAINT "fk_facts_articles"
            FOREIGN KEY ("article_id") REFERENCES "articles"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facts" DROP CONSTRAINT "fk_facts_articles"`);
        await queryRunner.query(`DROP TABLE "facts"`);
    }
}

