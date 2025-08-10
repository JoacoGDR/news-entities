export { seedSources } from './sources.seed';

import { seedSources } from './sources.seed';

export async function runAllSeeds(): Promise<void> {
  console.log('🌱 Running all seeds...\n');
  
  await seedSources();
  
  console.log('\n🎉 All seeds completed successfully!');
} 