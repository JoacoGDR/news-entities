import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLogoUrlToSources1758931202602 implements MigrationInterface {
    name = 'AddLogoUrlToSources1758931202602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sources" ADD "logo_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sources" DROP COLUMN "logo_url"`);
    }

}
