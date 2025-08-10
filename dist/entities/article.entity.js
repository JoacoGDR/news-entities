"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const typeorm_1 = require("typeorm");
const scraped_article_entity_1 = require("./scraped-article.entity");
const story_entity_1 = require("./story.entity");
const fact_entity_1 = require("./fact.entity");
const base_entity_1 = require("./base.entity");
const category_entity_1 = require("./category.entity");
let Article = class Article extends base_entity_1.BaseEntity {
};
exports.Article = Article;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Article.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Article.prototype, "scope", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Article.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'
    }),
    __metadata("design:type", Object)
], Article.prototype, "embedding", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: null, name: 'economic_bias' }),
    __metadata("design:type", Object)
], Article.prototype, "economicBias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: null, name: 'social_bias' }),
    __metadata("design:type", Object)
], Article.prototype, "socialBias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: null }),
    __metadata("design:type", Object)
], Article.prototype, "sentiment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => scraped_article_entity_1.ScrapedArticle, (scrapedArticle) => scrapedArticle.article),
    (0, typeorm_1.JoinColumn)({ name: 'scraped_article_id' }),
    __metadata("design:type", scraped_article_entity_1.ScrapedArticle)
], Article.prototype, "scrapedArticle", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => story_entity_1.Story, (story) => story.articles),
    __metadata("design:type", Array)
], Article.prototype, "stories", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => fact_entity_1.Fact, (fact) => fact.articles),
    (0, typeorm_1.JoinTable)({
        name: 'article_facts',
        joinColumn: { name: 'article_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'fact_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Article.prototype, "facts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_entity_1.Category, (category) => category.articles),
    (0, typeorm_1.JoinTable)({
        name: 'article_categories',
        joinColumn: { name: 'article_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Article.prototype, "categories", void 0);
exports.Article = Article = __decorate([
    (0, typeorm_1.Entity)('articles')
], Article);
//# sourceMappingURL=article.entity.js.map