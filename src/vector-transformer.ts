import { ValueTransformer } from 'typeorm';


export const VectorTransformer: ValueTransformer = {

  to(value: number[] | null): string | null {
    if (!value) return null;
    
    return `[${value.join(',')}]`;
  },

  from(value: string | null): number[] | null {
    if (!value) return null;
    
    try {
      const cleanValue = value.replace(/^\[|\]$/g, '');
      if (!cleanValue) return null;
      
      return cleanValue.split(',').map(num => parseFloat(num.trim()));
    } catch (error) {
      console.error('Error parsing vector value:', error);
      return null;
    }
  }
};

export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same dimension');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function validateVectorDimensions(vector: number[], expectedDimensions: number = 1536): boolean {
  return vector.length === expectedDimensions;
}


export function normalizeVector(vector: number[]): number[] {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  
  if (magnitude === 0) {
    return new Array(vector.length).fill(0);
  }
  
  return vector.map(val => val / magnitude);
} 