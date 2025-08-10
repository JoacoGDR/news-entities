import { DataSource } from "typeorm";
/**
 * Utility functions for managing database migrations in consuming applications
 */
export interface MigrationConfig {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    logging?: boolean;
}
/**
 * Creates a data source specifically configured for running migrations
 */
export declare function createMigrationDataSource(config?: MigrationConfig): DataSource;
/**
 * Runs pending migrations
 */
export declare function runMigrations(dataSource: DataSource): Promise<void>;
/**
 * Reverts the last migration
 */
export declare function revertLastMigration(dataSource: DataSource): Promise<void>;
/**
 * Shows migration status
 */
export declare function showMigrationStatus(dataSource: DataSource): Promise<void>;
/**
 * Helper function to handle common migration operations
 */
export declare class MigrationRunner {
    private dataSource;
    constructor(config?: MigrationConfig);
    initialize(): Promise<void>;
    destroy(): Promise<void>;
    run(): Promise<void>;
    revert(): Promise<void>;
    status(): Promise<void>;
}
//# sourceMappingURL=migration-utils.d.ts.map