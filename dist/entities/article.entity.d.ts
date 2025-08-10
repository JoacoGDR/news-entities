import { ScrapedArticle } from './scraped-article.entity';
import { Story } from './story.entity';
import { Fact } from './fact.entity';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
export declare class Article extends BaseEntity {
    title: string;
    summary: string;
    scope: string;
    type: string;
    embedding: string | null;
    economicBias: number | null;
    socialBias: number | null;
    sentiment: number | null;
    scrapedArticle: ScrapedArticle;
    stories: Story[];
    facts: Fact[];
    categories: Category[];
}
//# sourceMappingURL=article.entity.d.ts.map