import { runAllSeeds } from '../src/seeds';
import { AppDataSource } from '../src/data-source';

async function main() {
  try {
    console.log('🔄 Initializing database connection...');
    await AppDataSource.initialize();
    
    await runAllSeeds();
    
  } catch (error) {
    console.error('❌ Error running seeds:', error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('📡 Database connection closed');
    }
  }
}

main();