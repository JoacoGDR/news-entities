import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSourcesTable1700000000002 implements MigrationInterface {
    name = 'CreateSourcesTable1700000000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "sources" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "domain" character varying NOT NULL,
                "location" character varying NOT NULL,
                "logo_url" character varying,
                CONSTRAINT "uq_sources_name" UNIQUE ("name"),
                CONSTRAINT "pk_sources" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sources"`);
    }
}

