import { RssEntry } from './rss-entry.entity';
import { Article } from './article.entity';
import { BaseEntity } from './base.entity';
export declare class ScrapedArticle extends BaseEntity {
    title: string;
    byline: string;
    excerpt: string;
    scrapedContent: string;
    scrapedAt: Date;
    rssEntry: RssEntry;
    article: Article;
}
//# sourceMappingURL=scraped-article.entity.d.ts.map