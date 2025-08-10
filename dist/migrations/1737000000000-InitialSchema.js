"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1737000000000 = void 0;
class InitialSchema1737000000000 {
    constructor() {
        this.name = 'InitialSchema1737000000000';
    }
    async up(queryRunner) {
        // Create vector extension for PostgreSQL
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector`);
        // Create sources table
        await queryRunner.query(`
            CREATE TABLE "sources" (
                "id" SERIAL NOT NULL,
                "name" VARCHAR NOT NULL,
                "rssFeedUrl" VARCHAR NOT NULL,
                "domain" VARCHAR NOT NULL,
                "location" VARCHAR NOT NULL,
                "lastFetched" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
            )
        `);
        // Create rssEntries table
        await queryRunner.query(`
            CREATE TABLE "rssEntries" (
                "id" SERIAL NOT NULL,
                "sourceId" INTEGER NOT NULL,
                "title" TEXT NOT NULL,
                "link" TEXT NOT NULL,
                "publishedAt" TIMESTAMP NOT NULL,
                "fetchedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "enqueued" BOOLEAN NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "rssEntries_pkey" PRIMARY KEY ("id")
            )
        `);
        // Create scrapedArticles table
        await queryRunner.query(`
            CREATE TABLE "scrapedArticles" (
                "id" SERIAL NOT NULL,
                "rssEntryId" INTEGER NOT NULL,
                "title" TEXT,
                "byline" TEXT,
                "excerpt" TEXT,
                "content" TEXT NOT NULL,
                "scrapedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "scrapedArticles_pkey" PRIMARY KEY ("id")
            )
        `);
        // Create articles table
        await queryRunner.query(`
            CREATE TABLE "articles" (
                "id" SERIAL NOT NULL,
                "scrapedArticleId" INTEGER NOT NULL,
                "title" TEXT NOT NULL,
                "summary" TEXT NOT NULL,
                "category" TEXT NOT NULL,
                "scope" TEXT NOT NULL,
                "type" TEXT NOT NULL,
                "embedding" VECTOR(1536),
                "economicBias" TEXT NOT NULL,
                "socialBias" TEXT NOT NULL,
                "sentiment" TEXT NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
            )
        `);
        // Create stories table
        await queryRunner.query(`
            CREATE TABLE "stories" (
                "id" SERIAL NOT NULL,
                "title" TEXT NOT NULL,
                "summary" TEXT NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "stories_pkey" PRIMARY KEY ("id")
            )
        `);
        // Create facts table
        await queryRunner.query(`
            CREATE TABLE "facts" (
                "id" SERIAL NOT NULL,
                "storyId" INTEGER NOT NULL,
                "fact" TEXT NOT NULL,
                "embedding" VECTOR(1536),
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "facts_pkey" PRIMARY KEY ("id")
            )
        `);
        // Create tags table
        await queryRunner.query(`
            CREATE TABLE "tags" (
                "id" SERIAL NOT NULL,
                "name" TEXT NOT NULL,
                "embedding" VECTOR(1536),
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
            )
        `);
        // Create junction tables
        await queryRunner.query(`
            CREATE TABLE "_ArticleStories" (
                "A" INTEGER NOT NULL,
                "B" INTEGER NOT NULL,
                CONSTRAINT "_ArticleStories_AB_pkey" PRIMARY KEY ("A","B")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "_ArticleFacts" (
                "A" INTEGER NOT NULL,
                "B" INTEGER NOT NULL,
                CONSTRAINT "_ArticleFacts_AB_pkey" PRIMARY KEY ("A","B")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "_StoryTags" (
                "A" INTEGER NOT NULL,
                "B" INTEGER NOT NULL,
                CONSTRAINT "_StoryTags_AB_pkey" PRIMARY KEY ("A","B")
            )
        `);
        // Create unique indexes
        await queryRunner.query(`CREATE UNIQUE INDEX "sources_rssFeedUrl_key" ON "sources"("rssFeedUrl")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "rssEntries_link_key" ON "rssEntries"("link")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "scrapedArticles_rssEntryId_key" ON "scrapedArticles"("rssEntryId")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "articles_scrapedArticleId_key" ON "articles"("scrapedArticleId")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name")`);
        // Create junction table indexes
        await queryRunner.query(`CREATE INDEX "_ArticleStories_B_index" ON "_ArticleStories"("B")`);
        await queryRunner.query(`CREATE INDEX "_ArticleFacts_B_index" ON "_ArticleFacts"("B")`);
        await queryRunner.query(`CREATE INDEX "_StoryTags_B_index" ON "_StoryTags"("B")`);
        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "rssEntries" 
            ADD CONSTRAINT "rssEntries_sourceId_fkey" 
            FOREIGN KEY ("sourceId") REFERENCES "sources"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "scrapedArticles" 
            ADD CONSTRAINT "scrapedArticles_rssEntryId_fkey" 
            FOREIGN KEY ("rssEntryId") REFERENCES "rssEntries"("id") 
            ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "articles" 
            ADD CONSTRAINT "articles_scrapedArticleId_fkey" 
            FOREIGN KEY ("scrapedArticleId") REFERENCES "scrapedArticles"("id") 
            ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "facts" 
            ADD CONSTRAINT "facts_storyId_fkey" 
            FOREIGN KEY ("storyId") REFERENCES "stories"("id") 
            ON DELETE RESTRICT ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "_ArticleStories" 
            ADD CONSTRAINT "_ArticleStories_A_fkey" 
            FOREIGN KEY ("A") REFERENCES "articles"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "_ArticleStories" 
            ADD CONSTRAINT "_ArticleStories_B_fkey" 
            FOREIGN KEY ("B") REFERENCES "stories"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "_ArticleFacts" 
            ADD CONSTRAINT "_ArticleFacts_A_fkey" 
            FOREIGN KEY ("A") REFERENCES "articles"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "_ArticleFacts" 
            ADD CONSTRAINT "_ArticleFacts_B_fkey" 
            FOREIGN KEY ("B") REFERENCES "facts"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "_StoryTags" 
            ADD CONSTRAINT "_StoryTags_A_fkey" 
            FOREIGN KEY ("A") REFERENCES "stories"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "_StoryTags" 
            ADD CONSTRAINT "_StoryTags_B_fkey" 
            FOREIGN KEY ("B") REFERENCES "tags"("id") 
            ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }
    async down(queryRunner) {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "_StoryTags" DROP CONSTRAINT "_StoryTags_B_fkey"`);
        await queryRunner.query(`ALTER TABLE "_StoryTags" DROP CONSTRAINT "_StoryTags_A_fkey"`);
        await queryRunner.query(`ALTER TABLE "_ArticleFacts" DROP CONSTRAINT "_ArticleFacts_B_fkey"`);
        await queryRunner.query(`ALTER TABLE "_ArticleFacts" DROP CONSTRAINT "_ArticleFacts_A_fkey"`);
        await queryRunner.query(`ALTER TABLE "_ArticleStories" DROP CONSTRAINT "_ArticleStories_B_fkey"`);
        await queryRunner.query(`ALTER TABLE "_ArticleStories" DROP CONSTRAINT "_ArticleStories_A_fkey"`);
        await queryRunner.query(`ALTER TABLE "facts" DROP CONSTRAINT "facts_storyId_fkey"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "articles_scrapedArticleId_fkey"`);
        await queryRunner.query(`ALTER TABLE "scrapedArticles" DROP CONSTRAINT "scrapedArticles_rssEntryId_fkey"`);
        await queryRunner.query(`ALTER TABLE "rssEntries" DROP CONSTRAINT "rssEntries_sourceId_fkey"`);
        // Drop indexes
        await queryRunner.query(`DROP INDEX "_StoryTags_B_index"`);
        await queryRunner.query(`DROP INDEX "_ArticleFacts_B_index"`);
        await queryRunner.query(`DROP INDEX "_ArticleStories_B_index"`);
        await queryRunner.query(`DROP INDEX "tags_name_key"`);
        await queryRunner.query(`DROP INDEX "articles_scrapedArticleId_key"`);
        await queryRunner.query(`DROP INDEX "scrapedArticles_rssEntryId_key"`);
        await queryRunner.query(`DROP INDEX "rssEntries_link_key"`);
        await queryRunner.query(`DROP INDEX "sources_rssFeedUrl_key"`);
        // Drop tables
        await queryRunner.query(`DROP TABLE "_StoryTags"`);
        await queryRunner.query(`DROP TABLE "_ArticleFacts"`);
        await queryRunner.query(`DROP TABLE "_ArticleStories"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "facts"`);
        await queryRunner.query(`DROP TABLE "stories"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "scrapedArticles"`);
        await queryRunner.query(`DROP TABLE "rssEntries"`);
        await queryRunner.query(`DROP TABLE "sources"`);
        // Note: We don't drop the vector extension as it might be used by other parts of the system
    }
}
exports.InitialSchema1737000000000 = InitialSchema1737000000000;
//# sourceMappingURL=1737000000000-InitialSchema.js.map