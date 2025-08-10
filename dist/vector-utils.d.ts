import { DataSource } from 'typeorm';
import { Fact, Article, Tag } from './entities';
/**
 * Utility functions for vector similarity searches using pgvector
 */
export interface VectorSearchResult<T> {
    id: number;
    distance: number;
    data: T;
}
/**
 * Find similar articles by embedding vector
 * @param dataSource TypeORM DataSource instance
 * @param targetEmbedding The embedding vector to search against (1536 dimensions)
 * @param limit Maximum number of results to return
 * @param threshold Optional distance threshold (lower = more similar)
 */
export declare function findSimilarArticles(dataSource: DataSource, targetEmbedding: number[], limit?: number, threshold?: number): Promise<VectorSearchResult<Article>[]>;
/**
 * Find similar facts by embedding vector
 * @param dataSource TypeORM DataSource instance
 * @param targetEmbedding The embedding vector to search against (1536 dimensions)
 * @param limit Maximum number of results to return
 * @param threshold Optional distance threshold (lower = more similar)
 */
export declare function findSimilarFacts(dataSource: DataSource, targetEmbedding: number[], limit?: number, threshold?: number): Promise<VectorSearchResult<Fact>[]>;
/**
 * Find similar tags by embedding vector
 * @param dataSource TypeORM DataSource instance
 * @param targetEmbedding The embedding vector to search against (1536 dimensions)
 * @param limit Maximum number of results to return
 * @param threshold Optional distance threshold (lower = more similar)
 */
export declare function findSimilarTags(dataSource: DataSource, targetEmbedding: number[], limit?: number, threshold?: number): Promise<VectorSearchResult<Tag>[]>;
/**
 * Calculate cosine similarity between two embeddings using pgvector
 * @param dataSource TypeORM DataSource instance
 * @param embedding1 First embedding vector (1536 dimensions)
 * @param embedding2 Second embedding vector (1536 dimensions)
 * @returns Cosine similarity value (-1 to 1, where 1 is most similar)
 */
export declare function calculateCosineSimilarity(dataSource: DataSource, embedding1: number[], embedding2: number[]): Promise<number>;
/**
 * Batch insert embeddings for entities (useful for initial data population)
 * @param dataSource TypeORM DataSource instance
 * @param tableName The table name ('articles', 'facts', or 'tags')
 * @param embeddings Array of {id, embedding} objects
 */
export declare function batchUpdateEmbeddings(dataSource: DataSource, tableName: 'articles' | 'facts' | 'tags', embeddings: Array<{
    id: number;
    embedding: number[];
}>): Promise<void>;
//# sourceMappingURL=vector-utils.d.ts.map