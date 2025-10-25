import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStoryDevelopmentsTable1700000000009 implements MigrationInterface {
    name = 'CreateStoryDevelopmentsTable1700000000009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "story_developments" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "development" character varying NOT NULL,
                "story_id" integer,
                CONSTRAINT "pk_story_developments" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "story_developments"
            ADD CONSTRAINT "fk_story_developments_stories"
            FOREIGN KEY ("story_id") REFERENCES "stories"("id")
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "story_developments" DROP CONSTRAINT "fk_story_developments_stories"`);
        await queryRunner.query(`DROP TABLE "story_developments"`);
    }
}

