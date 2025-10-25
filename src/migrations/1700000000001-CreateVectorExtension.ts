import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVectorExtension1700000000001 implements MigrationInterface {
    name = 'CreateVectorExtension1700000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP EXTENSION IF EXISTS vector`);
    }
}

