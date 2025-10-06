import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmbeddingToFacts1759694928843 implements MigrationInterface {
    name = 'AddEmbeddingToFacts1759694928843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facts" ADD "embedding" vector(1536)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
