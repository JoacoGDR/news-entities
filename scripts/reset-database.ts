import { AppDataSource } from '../src/data-source';

async function resetDatabase() {
  try {
    console.log('🔄 Initializing database connection...');
    await AppDataSource.initialize();

    console.log('🗑️  Dropping all tables...');
    await AppDataSource.dropDatabase();

    console.log('🏗️  Creating database schema...');
    await AppDataSource.synchronize();

    console.log('📋 Running migrations...');
    await AppDataSource.runMigrations();

    console.log('✅ Database reset completed successfully!');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

async function resetDatabaseManual() {
  try {
    console.log('🔄 Initializing database connection...');
    await AppDataSource.initialize();

    console.log('🗑️  Dropping all tables manually...');

    const result = await AppDataSource.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      AND tablename NOT LIKE 'pg_%'
    `);

    const existingTables = result.map((row: any) => row.tablename);
    console.log(`   Found ${existingTables.length} existing tables`);

    for (const tableName of existingTables) {
      try {
        await AppDataSource.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
        console.log(`   ✓ Dropped table: ${tableName}`);
      } catch (error) {
        console.log(`   ⚠️  Could not drop table ${tableName}: ${error}`);
      }
    }

    try {
      await AppDataSource.query(`DROP EXTENSION IF EXISTS vector CASCADE`);
      console.log(`   ✓ Dropped vector extension`);
    } catch (error) {
      console.log(`   ⚠️  Could not drop vector extension (may not exist)`);
    }

    // Verify all tables are gone
    const remainingTables = await AppDataSource.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
      AND tablename NOT LIKE 'pg_%'
    `);

    if (remainingTables.length === 0) {
      console.log('   ✅ All tables successfully dropped');
    } else {
      console.log(`   ⚠️  ${remainingTables.length} tables still remain:`, remainingTables.map((r: any) => r.tablename));
    }

    console.log('📋 Running migrations...');
    await AppDataSource.runMigrations();

    console.log('✅ Database reset completed successfully!');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

const useAutoApproach = process.argv.includes('--auto');

if (useAutoApproach) {
  resetDatabase();
} else {
  resetDatabaseManual();
}
