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
exports.RssEntry = void 0;
const typeorm_1 = require("typeorm");
const source_entity_1 = require("./source.entity");
const scraped_article_entity_1 = require("./scraped-article.entity");
const base_entity_1 = require("./base.entity");
let RssEntry = class RssEntry extends base_entity_1.BaseEntity {
};
exports.RssEntry = RssEntry;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RssEntry.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RssEntry.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, typeorm_1.Index)({ unique: true }),
    __metadata("design:type", String)
], RssEntry.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'published_at' }),
    __metadata("design:type", Date)
], RssEntry.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'fetched_at' }),
    __metadata("design:type", Date)
], RssEntry.prototype, "fetchedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_enqueued', default: false }),
    __metadata("design:type", Boolean)
], RssEntry.prototype, "isEnqueued", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => source_entity_1.Source, (source) => source.rssEntries),
    (0, typeorm_1.JoinColumn)({ name: 'source_id' }),
    __metadata("design:type", source_entity_1.Source)
], RssEntry.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => scraped_article_entity_1.ScrapedArticle, (scrapedArticle) => scrapedArticle.rssEntry),
    __metadata("design:type", scraped_article_entity_1.ScrapedArticle)
], RssEntry.prototype, "scrapedArticle", void 0);
exports.RssEntry = RssEntry = __decorate([
    (0, typeorm_1.Entity)('rss_entries')
], RssEntry);
//# sourceMappingURL=rss-entry.entity.js.map