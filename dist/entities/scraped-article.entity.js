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
exports.ScrapedArticle = void 0;
const typeorm_1 = require("typeorm");
const rss_entry_entity_1 = require("./rss-entry.entity");
const article_entity_1 = require("./article.entity");
const base_entity_1 = require("./base.entity");
let ScrapedArticle = class ScrapedArticle extends base_entity_1.BaseEntity {
};
exports.ScrapedArticle = ScrapedArticle;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ScrapedArticle.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ScrapedArticle.prototype, "byline", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ScrapedArticle.prototype, "excerpt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'scraped_content' }),
    __metadata("design:type", String)
], ScrapedArticle.prototype, "scrapedContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'scraped_at' }),
    __metadata("design:type", Date)
], ScrapedArticle.prototype, "scrapedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => rss_entry_entity_1.RssEntry, (rssEntry) => rssEntry.scrapedArticle),
    (0, typeorm_1.JoinColumn)({ name: 'rss_entry_id' }),
    __metadata("design:type", rss_entry_entity_1.RssEntry)
], ScrapedArticle.prototype, "rssEntry", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => article_entity_1.Article, (article) => article.scrapedArticle),
    __metadata("design:type", article_entity_1.Article)
], ScrapedArticle.prototype, "article", void 0);
exports.ScrapedArticle = ScrapedArticle = __decorate([
    (0, typeorm_1.Entity)('scraped_articles')
], ScrapedArticle);
//# sourceMappingURL=scraped-article.entity.js.map