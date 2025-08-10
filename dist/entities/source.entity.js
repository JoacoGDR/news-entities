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
exports.Source = void 0;
const typeorm_1 = require("typeorm");
const rss_entry_entity_1 = require("./rss-entry.entity");
const base_entity_1 = require("./base.entity");
let Source = class Source extends base_entity_1.BaseEntity {
};
exports.Source = Source;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Source.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, name: 'rss_feed_url' }),
    __metadata("design:type", String)
], Source.prototype, "rssFeedUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Source.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Source.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'last_fetched_at' }),
    __metadata("design:type", Date)
], Source.prototype, "lastFetchedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rss_entry_entity_1.RssEntry, (rssEntry) => rssEntry.source),
    __metadata("design:type", Array)
], Source.prototype, "rssEntries", void 0);
exports.Source = Source = __decorate([
    (0, typeorm_1.Entity)('sources')
], Source);
//# sourceMappingURL=source.entity.js.map