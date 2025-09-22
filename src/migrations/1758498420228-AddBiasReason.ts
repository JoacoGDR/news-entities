import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBiasReason1758498420228 implements MigrationInterface {
    name = 'AddBiasReason1758498420228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "biasReason" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "biasReason"`);
    }

}
