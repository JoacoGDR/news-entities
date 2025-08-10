"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorTransformer = exports.createDataSource = exports.AppDataSource = void 0;
require("reflect-metadata");
// Export all entities
__exportStar(require("./entities"), exports);
__exportStar(require("./constants/article-constants"), exports);
// Export database configuration
var data_source_1 = require("./data-source");
Object.defineProperty(exports, "AppDataSource", { enumerable: true, get: function () { return data_source_1.AppDataSource; } });
Object.defineProperty(exports, "createDataSource", { enumerable: true, get: function () { return data_source_1.createDataSource; } });
// Export vector utilities for embedding operations
var vector_transformer_1 = require("./vector-transformer");
Object.defineProperty(exports, "VectorTransformer", { enumerable: true, get: function () { return vector_transformer_1.VectorTransformer; } });
__exportStar(require("./vector-utils"), exports);
// Export migration utilities if any
__exportStar(require("./migration-utils"), exports);
//# sourceMappingURL=index.js.map