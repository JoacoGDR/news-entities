import { Story } from './story.entity';
import { Article } from './article.entity';
import { BaseEntity } from './base.entity';
export declare class Fact extends BaseEntity {
    name: string;
    content: string;
    embedding: string | null;
    story: Story;
    articles: Article[];
}
//# sourceMappingURL=fact.entity.d.ts.map