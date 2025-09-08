import "reflect-metadata";
import { DataSource } from "typeorm";
import { Article } from "./entities/article.entity";
import { Story } from "./entities/story.entity";
import { Source } from "./entities/source.entity";
import { RssFeed } from "./entities/rss-feed.entity";
import { RssEntry } from "./entities/rss-entry.entity";
import { ScrapedArticle } from "./entities/scraped-article.entity";
import { Fact } from "./entities/fact.entity";
import { Tag } from "./entities/tag.entity";
import { Category } from "./entities/category.entity";
import { StoryHotScore } from "./entities/story-hot-score.entity";
import { StoryDevelopment } from "./entities/story-development.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "news_scraper",
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: [
    Article,
    Story,
    StoryDevelopment,
    Source,
    RssEntry,
    RssFeed,
    ScrapedArticle,
    Fact,
    Tag,
    Category,
    StoryHotScore
  ],
  migrations: [__dirname + "/migrations/*.ts"],
  migrationsRun: false,
  migrationsTableName: "typeorm_migrations",
});


export const createDataSource = (config?: Partial<typeof AppDataSource.options>): DataSource => {
  return new DataSource({
    ...AppDataSource.options,
    ...config,
  } as any);
};
