import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTagsTable1700000000007 implements MigrationInterface {
    name = 'CreateTagsTable1700000000007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tags" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "normalized_name" character varying NOT NULL,
                CONSTRAINT "pk_tags" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "ix_tags_name" ON "tags" ("name")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "ix_tags_normalized_name" ON "tags" ("normalized_name")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "ix_tags_normalized_name"`);
        await queryRunner.query(`DROP INDEX "ix_tags_name"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }
}

