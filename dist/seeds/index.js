"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSources = void 0;
exports.runAllSeeds = runAllSeeds;
var sources_seed_1 = require("./sources.seed");
Object.defineProperty(exports, "seedSources", { enumerable: true, get: function () { return sources_seed_1.seedSources; } });
const sources_seed_2 = require("./sources.seed");
async function runAllSeeds() {
    console.log('🌱 Running all seeds...\n');
    await (0, sources_seed_2.seedSources)();
    console.log('\n🎉 All seeds completed successfully!');
}
//# sourceMappingURL=index.js.map