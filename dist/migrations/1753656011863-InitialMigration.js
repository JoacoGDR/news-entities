"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1753656011863 = void 0;
class InitialMigration1753656011863 {
    constructor() {
        this.name = 'InitialMigration1753656011863';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);
        await queryRunner.query(`CREATE TABLE "sources" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "rss_feed_url" character varying NOT NULL, "domain" character varying NOT NULL, "location" character varying NOT NULL, "last_fetched_at" TIMESTAMP, CONSTRAINT "UQ_363904f5ab4f6635d05fae1e62f" UNIQUE ("rss_feed_url"), CONSTRAINT "PK_85523beafe5a2a6b90b02096443" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rss_entries" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" text, "url" character varying NOT NULL, "published_at" TIMESTAMP NOT NULL, "fetched_at" TIMESTAMP NOT NULL, "is_enqueued" boolean NOT NULL DEFAULT false, "source_id" integer, CONSTRAINT "PK_3340c59b85ddc30bc29528d29a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_744e2fdad0ccbb5bda6226beba" ON "rss_entries" ("url") `);
        await queryRunner.query(`CREATE TABLE "scraped_articles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "byline" character varying, "excerpt" text, "scraped_content" text NOT NULL, "scraped_at" TIMESTAMP NOT NULL, "rssEntryId" integer, CONSTRAINT "REL_f19919a4345508c18853edc9da" UNIQUE ("rssEntryId"), CONSTRAINT "PK_bd33847a79774b4e054cd9e2ea9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "facts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "content" text NOT NULL, "embedding" VECTOR(1536), "storyId" integer, CONSTRAINT "PK_b35218a44dc3d5dd2f0f54d7e3f" PRIMARY KEY ("id")); COMMENT ON COLUMN "facts"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "embedding" VECTOR(1536), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id")); COMMENT ON COLUMN "tags"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d90243459a697eadb8ad56e909" ON "tags" ("name") `);
        await queryRunner.query(`CREATE TABLE "stories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "summary" text NOT NULL, CONSTRAINT "PK_bb6f880b260ed96c452b32a39f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "summary" text NOT NULL, "category" character varying NOT NULL, "scope" character varying NOT NULL, "type" character varying NOT NULL, "embedding" VECTOR(1536), "economicBias" character varying NOT NULL, "socialBias" character varying NOT NULL, "sentiment" character varying NOT NULL, "scrapedArticleId" integer, CONSTRAINT "REL_417f2d5fec6a11a763729f994a" UNIQUE ("scrapedArticleId"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id")); COMMENT ON COLUMN "articles"."embedding" IS 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'`);
        await queryRunner.query(`CREATE TABLE "story_articles" ("story_id" integer NOT NULL, "article_id" integer NOT NULL, CONSTRAINT "PK_ced9562eb65f2218a9a345aed45" PRIMARY KEY ("story_id", "article_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_350dbafe1abfab5dff7ff13b12" ON "story_articles" ("story_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_836ba49984374440dd9b2cd55a" ON "story_articles" ("article_id") `);
        await queryRunner.query(`CREATE TABLE "story_tags" ("story_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_e1ec4350081fa242b2d34b44e03" PRIMARY KEY ("story_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_818bd0326f1417b77cb55f0b80" ON "story_tags" ("story_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_24edf1076b3af707856d5fcccd" ON "story_tags" ("tag_id") `);
        await queryRunner.query(`CREATE TABLE "article_facts" ("article_id" integer NOT NULL, "fact_id" integer NOT NULL, CONSTRAINT "PK_e76932c7b45041deff4b0f328ee" PRIMARY KEY ("article_id", "fact_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_00c6e9634f4c42a68e06a2adef" ON "article_facts" ("article_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_28240cc682f15437842015287b" ON "article_facts" ("fact_id") `);
        await queryRunner.query(`ALTER TABLE "rss_entries" ADD CONSTRAINT "FK_689e63230bd06ad2fc129b9ca0f" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scraped_articles" ADD CONSTRAINT "FK_f19919a4345508c18853edc9da9" FOREIGN KEY ("rssEntryId") REFERENCES "rss_entries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "facts" ADD CONSTRAINT "FK_f1fed3628488572384d959be64e" FOREIGN KEY ("storyId") REFERENCES "stories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_417f2d5fec6a11a763729f994af" FOREIGN KEY ("scrapedArticleId") REFERENCES "scraped_articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "story_articles" ADD CONSTRAINT "FK_350dbafe1abfab5dff7ff13b12f" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "story_articles" ADD CONSTRAINT "FK_836ba49984374440dd9b2cd55af" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "story_tags" ADD CONSTRAINT "FK_818bd0326f1417b77cb55f0b80f" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "story_tags" ADD CONSTRAINT "FK_24edf1076b3af707856d5fcccd3" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_facts" ADD CONSTRAINT "FK_00c6e9634f4c42a68e06a2adef7" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_facts" ADD CONSTRAINT "FK_28240cc682f15437842015287bc" FOREIGN KEY ("fact_id") REFERENCES "facts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "article_facts" DROP CONSTRAINT "FK_28240cc682f15437842015287bc"`);
        await queryRunner.query(`ALTER TABLE "article_facts" DROP CONSTRAINT "FK_00c6e9634f4c42a68e06a2adef7"`);
        await queryRunner.query(`ALTER TABLE "story_tags" DROP CONSTRAINT "FK_24edf1076b3af707856d5fcccd3"`);
        await queryRunner.query(`ALTER TABLE "story_tags" DROP CONSTRAINT "FK_818bd0326f1417b77cb55f0b80f"`);
        await queryRunner.query(`ALTER TABLE "story_articles" DROP CONSTRAINT "FK_836ba49984374440dd9b2cd55af"`);
        await queryRunner.query(`ALTER TABLE "story_articles" DROP CONSTRAINT "FK_350dbafe1abfab5dff7ff13b12f"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_417f2d5fec6a11a763729f994af"`);
        await queryRunner.query(`ALTER TABLE "facts" DROP CONSTRAINT "FK_f1fed3628488572384d959be64e"`);
        await queryRunner.query(`ALTER TABLE "scraped_articles" DROP CONSTRAINT "FK_f19919a4345508c18853edc9da9"`);
        await queryRunner.query(`ALTER TABLE "rss_entries" DROP CONSTRAINT "FK_689e63230bd06ad2fc129b9ca0f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28240cc682f15437842015287b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_00c6e9634f4c42a68e06a2adef"`);
        await queryRunner.query(`DROP TABLE "article_facts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24edf1076b3af707856d5fcccd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_818bd0326f1417b77cb55f0b80"`);
        await queryRunner.query(`DROP TABLE "story_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_836ba49984374440dd9b2cd55a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_350dbafe1abfab5dff7ff13b12"`);
        await queryRunner.query(`DROP TABLE "story_articles"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "stories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d90243459a697eadb8ad56e909"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "facts"`);
        await queryRunner.query(`DROP TABLE "scraped_articles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_744e2fdad0ccbb5bda6226beba"`);
        await queryRunner.query(`DROP TABLE "rss_entries"`);
        await queryRunner.query(`DROP TABLE "sources"`);
    }
}
exports.InitialMigration1753656011863 = InitialMigration1753656011863;
//# sourceMappingURL=1753656011863-InitialMigration.js.map