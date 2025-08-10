import { DataSource } from "typeorm";
import { createDataSource } from "./data-source";

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
export function createMigrationDataSource(config?: MigrationConfig): DataSource {
  return createDataSource({
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
export async function runMigrations(dataSource: DataSource): Promise<void> {
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
export async function revertLastMigration(dataSource: DataSource): Promise<void> {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  
  await dataSource.undoLastMigration();
  console.log('Successfully reverted last migration');
}

/**
 * Shows migration status
 */
export async function showMigrationStatus(dataSource: DataSource): Promise<void> {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  
  const migrations = await dataSource.showMigrations();
  console.log(`Pending migrations: ${migrations ? 'Yes' : 'No'}`);
}

/**
 * Helper function to handle common migration operations
 */
export class MigrationRunner {
  private dataSource: DataSource;

  constructor(config?: MigrationConfig) {
    this.dataSource = createMigrationDataSource(config);
  }

  async initialize(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
  }

  async destroy(): Promise<void> {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  }

  async run(): Promise<void> {
    await this.initialize();
    await runMigrations(this.dataSource);
  }

  async revert(): Promise<void> {
    await this.initialize();
    await revertLastMigration(this.dataSource);
  }

  async status(): Promise<void> {
    await this.initialize();
    await showMigrationStatus(this.dataSource);
  }
} 