"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataSource = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const article_entity_1 = require("./entities/article.entity");
const story_entity_1 = require("./entities/story.entity");
const source_entity_1 = require("./entities/source.entity");
const rss_entry_entity_1 = require("./entities/rss-entry.entity");
const scraped_article_entity_1 = require("./entities/scraped-article.entity");
const fact_entity_1 = require("./entities/fact.entity");
const tag_entity_1 = require("./entities/tag.entity");
const category_entity_1 = require("./entities/category.entity");
const story_hot_score_entity_1 = require("./entities/story-hot-score.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "news_scraper",
    synchronize: false,
    logging: process.env.NODE_ENV === "development",
    entities: [article_entity_1.Article, story_entity_1.Story, source_entity_1.Source, rss_entry_entity_1.RssEntry, scraped_article_entity_1.ScrapedArticle, fact_entity_1.Fact, tag_entity_1.Tag, category_entity_1.Category, story_hot_score_entity_1.StoryHotScore],
    migrations: [__dirname + "/migrations/*.ts"],
    migrationsRun: false,
    migrationsTableName: "typeorm_migrations",
});
const createDataSource = (config) => {
    return new typeorm_1.DataSource({
        ...exports.AppDataSource.options,
        ...config,
    });
};
exports.createDataSource = createDataSource;
//# sourceMappingURL=data-source.js.map