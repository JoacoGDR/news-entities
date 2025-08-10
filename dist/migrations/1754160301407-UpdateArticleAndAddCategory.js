"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleAndAddCategory1754160301407 = void 0;
class UpdateArticleAndAddCategory1754160301407 {
    constructor() {
        this.name = 'UpdateArticleAndAddCategory1754160301407';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_categories" ("article_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_52a14b5c9d57f91198335fa5e9d" PRIMARY KEY ("article_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6919cd26646fd24f7aac8166d4" ON "article_categories" ("article_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2074448c3764e149b3b0541c2a" ON "article_categories" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "facts" DROP COLUMN "embedding"`);
        await queryRunner.query(`ALTER TABLE "facts" ADD "embedding" text`);
        await queryRunner.query(`COMMENT ON COLUMN "facts"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "embedding"`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "embedding" text`);
        await queryRunner.query(`COMMENT ON COLUMN "tags"."embedding" IS 'Embedding vector for similarity search (1536 dimensions)'`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "embedding"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "embedding" text`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "economicBias"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "economicBias" integer`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "socialBias"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "socialBias" integer`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "sentiment"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "sentiment" integer`);
        await queryRunner.query(`ALTER TABLE "article_categories" ADD CONSTRAINT "FK_6919cd26646fd24f7aac8166d46" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_categories" ADD CONSTRAINT "FK_2074448c3764e149b3b0541c2a7" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "article_categories" DROP CONSTRAINT "FK_2074448c3764e149b3b0541c2a7"`);
        await queryRunner.query(`ALTER TABLE "article_categories" DROP CONSTRAINT "FK_6919cd26646fd24f7aac8166d46"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "sentiment"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "sentiment" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "socialBias"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "socialBias" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "economicBias"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "economicBias" character varying NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "articles"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "embedding"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "embedding" vector`);
        await queryRunner.query(`COMMENT ON COLUMN "tags"."embedding" IS 'Embedding vector for similarity search (1536 dimensions)'`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "embedding"`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "embedding" vector`);
        await queryRunner.query(`COMMENT ON COLUMN "facts"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'`);
        await queryRunner.query(`ALTER TABLE "facts" DROP COLUMN "embedding"`);
        await queryRunner.query(`ALTER TABLE "facts" ADD "embedding" vector`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2074448c3764e149b3b0541c2a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6919cd26646fd24f7aac8166d4"`);
        await queryRunner.query(`DROP TABLE "article_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
exports.UpdateArticleAndAddCategory1754160301407 = UpdateArticleAndAddCategory1754160301407;
//# sourceMappingURL=1754160301407-UpdateArticleAndAddCategory.js.map