import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoverImageToStory1757800981000 implements MigrationInterface {
    name = 'AddCoverImageToStory1757800981000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stories" ADD "cover_image_path" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stories" DROP COLUMN "cover_image_path"`);
    }
}
