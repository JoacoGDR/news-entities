import "reflect-metadata";

// Export all entities
export * from './entities';
export * from './constants/article-constants';

// Export database configuration
export { AppDataSource, createDataSource } from './data-source';

// Export vector utilities for embedding operations
export { VectorTransformer } from './vector-transformer';
export * from './vector-utils';

// Export migration utilities if any
export * from './migration-utils'; 