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
exports.Fact = void 0;
const typeorm_1 = require("typeorm");
const story_entity_1 = require("./story.entity");
const article_entity_1 = require("./article.entity");
const base_entity_1 = require("./base.entity");
let Fact = class Fact extends base_entity_1.BaseEntity {
};
exports.Fact = Fact;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Fact.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Fact.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Embedding vector for similarity search (1536 dimensions for OpenAI text-embedding-3-small)'
    }),
    __metadata("design:type", Object)
], Fact.prototype, "embedding", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => story_entity_1.Story, (story) => story.facts),
    (0, typeorm_1.JoinColumn)({ name: 'story_id' }),
    __metadata("design:type", story_entity_1.Story)
], Fact.prototype, "story", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => article_entity_1.Article, (article) => article.facts),
    __metadata("design:type", Array)
], Fact.prototype, "articles", void 0);
exports.Fact = Fact = __decorate([
    (0, typeorm_1.Entity)('facts')
], Fact);
//# sourceMappingURL=fact.entity.js.map