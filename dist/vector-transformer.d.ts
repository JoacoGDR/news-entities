import { ValueTransformer } from 'typeorm';
export declare const VectorTransformer: ValueTransformer;
export declare function cosineSimilarity(vectorA: number[], vectorB: number[]): number;
export declare function validateVectorDimensions(vector: number[], expectedDimensions?: number): boolean;
export declare function normalizeVector(vector: number[]): number[];
//# sourceMappingURL=vector-transformer.d.ts.map