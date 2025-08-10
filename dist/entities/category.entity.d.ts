import { Article } from "./article.entity";
import { BaseEntity } from "./base.entity";
export declare class Category extends BaseEntity {
    name: string;
    description: string;
    storyTrigger: boolean;
    articles: Article[];
}
//# sourceMappingURL=category.entity.d.ts.map