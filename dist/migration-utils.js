"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationRunner = void 0;
exports.createMigrationDataSource = createMigrationDataSource;
exports.runMigrations = runMigrations;
exports.revertLastMigration = revertLastMigration;
exports.showMigrationStatus = showMigrationStatus;
const data_source_1 = require("./data-source");
/**
 * Creates a data source specifically configured for running migrations
 */
function createMigrationDataSource(config) {
    return (0, data_source_1.createDataSource)({
        ...config,
        logging: config?.logging ?? true,
        migrationsRun: false, // Never auto-run migrations
        synchronize: false, // Never auto-sync in production
        entities: [], // Entities are loaded from the package
        migrations: ["node_modules/news-entities/dist/migrations/*.js"], // Reference migrations from the package
    });
}
/**
 * Runs pending migrations
 */
async function runMigrations(dataSource) {
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }
    const migrations = await dataSource.runMigrations();
    console.log(`Successfully ran ${migrations.length} migration(s)`);
    if (migrations.length > 0) {
        console.log('Applied migrations:');
        migrations.forEach(migration => {
            console.log(`  - ${migration.name}`);
        });
    }
}
/**
 * Reverts the last migration
 */
async function revertLastMigration(dataSource) {
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }
    await dataSource.undoLastMigration();
    console.log('Successfully reverted last migration');
}
/**
 * Shows migration status
 */
async function showMigrationStatus(dataSource) {
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }
    const migrations = await dataSource.showMigrations();
    console.log(`Pending migrations: ${migrations ? 'Yes' : 'No'}`);
}
/**
 * Helper function to handle common migration operations
 */
class MigrationRunner {
    constructor(config) {
        this.dataSource = createMigrationDataSource(config);
    }
    async initialize() {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
        }
    }
    async destroy() {
        if (this.dataSource.isInitialized) {
            await this.dataSource.destroy();
        }
    }
    async run() {
        await this.initialize();
        await runMigrations(this.dataSource);
    }
    async revert() {
        await this.initialize();
        await revertLastMigration(this.dataSource);
    }
    async status() {
        await this.initialize();
        await showMigrationStatus(this.dataSource);
    }
}
exports.MigrationRunner = MigrationRunner;
//# sourceMappingURL=migration-utils.js.map