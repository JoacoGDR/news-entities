import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStoryFactsTable1700000000013 implements MigrationInterface {
    name = 'CreateStoryFactsTable1700000000013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "story_facts" (
                "story_id" integer NOT NULL,
                "fact_id" integer NOT NULL,
                CONSTRAINT "pk_story_facts" PRIMARY KEY ("story_id", "fact_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_story_facts_story_id" ON "story_facts" ("story_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "ix_story_facts_fact_id" ON "story_facts" ("fact_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "story_facts"
            ADD CONSTRAINT "fk_story_facts_stories"
            FOREIGN KEY ("story_id") REFERENCES "stories"("id")
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "story_facts"
            ADD CONSTRAINT "fk_story_facts_facts"
            FOREIGN KEY ("fact_id") REFERENCES "facts"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_facts" DROP CONSTRAINT "fk_story_facts_facts"`);
        await queryRunner.query(`ALTER TABLE "story_facts" DROP CONSTRAINT "fk_story_facts_stories"`);
        await queryRunner.query(`DROP INDEX "ix_story_facts_fact_id"`);
        await queryRunner.query(`DROP INDEX "ix_story_facts_story_id"`);
        await queryRunner.query(`DROP TABLE "story_facts"`);
    }
}

