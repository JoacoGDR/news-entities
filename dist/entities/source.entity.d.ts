import { RssEntry } from './rss-entry.entity';
import { BaseEntity } from './base.entity';
export declare class Source extends BaseEntity {
    name: string;
    rssFeedUrl: string;
    domain: string;
    location: string;
    lastFetchedAt: Date;
    rssEntries: RssEntry[];
}
//# sourceMappingURL=source.entity.d.ts.map