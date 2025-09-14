import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveFactsEmbedding1757863086000 implements MigrationInterface {
    name = 'RemoveFactsEmbedding1757863086000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facts" DROP COLUMN "embedding"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
