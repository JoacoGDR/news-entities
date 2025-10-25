import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoriesTable1700000000006 implements MigrationInterface {
    name = 'CreateCategoriesTable1700000000006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "description" text NOT NULL,
                "story_trigger" boolean NOT NULL DEFAULT false,
                CONSTRAINT "uq_categories_name" UNIQUE ("name"),
                CONSTRAINT "pk_categories" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}

