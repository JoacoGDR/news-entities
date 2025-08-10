import { Source } from './source.entity';
import { ScrapedArticle } from './scraped-article.entity';
import { BaseEntity } from './base.entity';
export declare class RssEntry extends BaseEntity {
    title: string;
    description: string;
    url: string;
    publishedAt: Date;
    fetchedAt: Date;
    isEnqueued: boolean;
    source: Source;
    scrapedArticle: ScrapedArticle;
}
//# sourceMappingURL=rss-entry.entity.d.ts.map