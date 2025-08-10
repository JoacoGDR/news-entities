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
export async function findSimilarArticles(
  dataSource: DataSource,
  targetEmbedding: number[],
  limit: number = 10,
  threshold?: number
): Promise<VectorSearchResult<Article>[]> {
  if (targetEmbedding.length !== 1536) {
    throw new Error('Target embedding must be exactly 1536 dimensions');
  }

  const vectorString = `[${targetEmbedding.join(',')}]`;
  
  let query = `
    SELECT 
      id, 
      title,
      summary,
      category,
      (embedding <-> $1::vector) AS distance 
    FROM articles 
    WHERE embedding IS NOT NULL
  `;
  
  const params: any[] = [vectorString];
  
  if (threshold !== undefined) {
    query += ` AND (embedding <-> $1::vector) < $2`;
    params.push(threshold);
  }
  
  query += ` ORDER BY embedding <-> $1::vector LIMIT $${params.length + 1}`;
  params.push(limit);

  return await dataSource.query(query, params);
}

/**
 * Find similar facts by embedding vector
 * @param dataSource TypeORM DataSource instance
 * @param targetEmbedding The embedding vector to search against (1536 dimensions)
 * @param limit Maximum number of results to return
 * @param threshold Optional distance threshold (lower = more similar)
 */
export async function findSimilarFacts(
  dataSource: DataSource,
  targetEmbedding: number[],
  limit: number = 10,
  threshold?: number
): Promise<VectorSearchResult<Fact>[]> {
  if (targetEmbedding.length !== 1536) {
    throw new Error('Target embedding must be exactly 1536 dimensions');
  }

  const vectorString = `[${targetEmbedding.join(',')}]`;
  
  let query = `
    SELECT 
      f.id, 
      f.name,
      f.content,
      s.title as story_title,
      (f.embedding <-> $1::vector) AS distance 
    FROM facts f
    LEFT JOIN stories s ON f."storyId" = s.id
    WHERE f.embedding IS NOT NULL
  `;
  
  const params: any[] = [vectorString];
  
  if (threshold !== undefined) {
    query += ` AND (f.embedding <-> $1::vector) < $2`;
    params.push(threshold);
  }
  
  query += ` ORDER BY f.embedding <-> $1::vector LIMIT $${params.length + 1}`;
  params.push(limit);

  return await dataSource.query(query, params);
}

/**
 * Find similar tags by embedding vector
 * @param dataSource TypeORM DataSource instance
 * @param targetEmbedding The embedding vector to search against (1536 dimensions)
 * @param limit Maximum number of results to return
 * @param threshold Optional distance threshold (lower = more similar)
 */
export async function findSimilarTags(
  dataSource: DataSource,
  targetEmbedding: number[],
  limit: number = 10,
  threshold?: number
): Promise<VectorSearchResult<Tag>[]> {
  if (targetEmbedding.length !== 1536) {
    throw new Error('Target embedding must be exactly 1536 dimensions');
  }

  const vectorString = `[${targetEmbedding.join(',')}]`;
  
  let query = `
    SELECT 
      id, 
      name,
      (embedding <-> $1::vector) AS distance 
    FROM tags 
    WHERE embedding IS NOT NULL
  `;
  
  const params: any[] = [vectorString];
  
  if (threshold !== undefined) {
    query += ` AND (embedding <-> $1::vector) < $2`;
    params.push(threshold);
  }
  
  query += ` ORDER BY embedding <-> $1::vector LIMIT $${params.length + 1}`;
  params.push(limit);

  return await dataSource.query(query, params);
}

/**
 * Calculate cosine similarity between two embeddings using pgvector
 * @param dataSource TypeORM DataSource instance
 * @param embedding1 First embedding vector (1536 dimensions)
 * @param embedding2 Second embedding vector (1536 dimensions)
 * @returns Cosine similarity value (-1 to 1, where 1 is most similar)
 */
export async function calculateCosineSimilarity(
  dataSource: DataSource,
  embedding1: number[],
  embedding2: number[]
): Promise<number> {
  if (embedding1.length !== 1536 || embedding2.length !== 1536) {
    throw new Error('Both embeddings must be exactly 1536 dimensions');
  }

  const vector1String = `[${embedding1.join(',')}]`;
  const vector2String = `[${embedding2.join(',')}]`;
  
  const query = `SELECT 1 - ($1::vector <=> $2::vector) AS cosine_similarity`;
  const result = await dataSource.query(query, [vector1String, vector2String]);
  
  return result[0].cosine_similarity;
}

/**
 * Batch insert embeddings for entities (useful for initial data population)
 * @param dataSource TypeORM DataSource instance
 * @param tableName The table name ('articles', 'facts', or 'tags')
 * @param embeddings Array of {id, embedding} objects
 */
export async function batchUpdateEmbeddings(
  dataSource: DataSource,
  tableName: 'articles' | 'facts' | 'tags',
  embeddings: Array<{ id: number; embedding: number[] }>
): Promise<void> {
  if (embeddings.length === 0) return;

  // Validate all embeddings are 1536 dimensions
  for (const item of embeddings) {
    if (item.embedding.length !== 1536) {
      throw new Error(`Embedding for ID ${item.id} must be exactly 1536 dimensions`);
    }
  }

  const values = embeddings.map((item, index) => {
    const vectorString = `[${item.embedding.join(',')}]`;
    return `($${index * 2 + 1}, $${index * 2 + 2}::vector)`;
  }).join(', ');

  const params = embeddings.flatMap(item => [item.id, `[${item.embedding.join(',')}]`]);

  const query = `
    UPDATE ${tableName} 
    SET embedding = data.embedding 
    FROM (VALUES ${values}) AS data(id, embedding) 
    WHERE ${tableName}.id = data.id
  `;

  await dataSource.query(query, params);
} 