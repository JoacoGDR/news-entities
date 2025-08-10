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
exports.Story = void 0;
const typeorm_1 = require("typeorm");
const fact_entity_1 = require("./fact.entity");
const tag_entity_1 = require("./tag.entity");
const article_entity_1 = require("./article.entity");
const base_entity_1 = require("./base.entity");
let Story = class Story extends base_entity_1.BaseEntity {
};
exports.Story = Story;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Story.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Story.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => article_entity_1.Article, (article) => article.stories),
    (0, typeorm_1.JoinTable)({
        name: 'story_articles',
        joinColumn: { name: 'story_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'article_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Story.prototype, "articles", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, (tag) => tag.stories),
    (0, typeorm_1.JoinTable)({
        name: 'story_tags',
        joinColumn: { name: 'story_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Story.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fact_entity_1.Fact, (fact) => fact.story),
    __metadata("design:type", Array)
], Story.prototype, "facts", void 0);
exports.Story = Story = __decorate([
    (0, typeorm_1.Entity)('stories')
], Story);
//# sourceMappingURL=story.entity.js.map