import { Fact } from './fact.entity';
import { Tag } from './tag.entity';
import { Article } from './article.entity';
import { BaseEntity } from './base.entity';
export declare class Story extends BaseEntity {
    title: string;
    summary: string;
    articles: Article[];
    tags: Tag[];
    facts: Fact[];
}
//# sourceMappingURL=story.entity.d.ts.map