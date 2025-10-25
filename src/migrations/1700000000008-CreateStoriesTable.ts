import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStoriesTable1700000000008 implements MigrationInterface {
    name = 'CreateStoriesTable1700000000008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "stories" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "summary" text NOT NULL,
                "cover_image_url" text,
                CONSTRAINT "pk_stories" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stories"`);
    }
}

