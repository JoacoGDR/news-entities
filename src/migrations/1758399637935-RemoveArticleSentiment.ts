import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveArticleSentiment1758399637935 implements MigrationInterface {
    name = 'RemoveArticleSentiment1758399637935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "sentiment"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "sentiment" integer`);
    }

}
