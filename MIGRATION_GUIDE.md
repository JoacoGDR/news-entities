# Database Migration Strategy

This document outlines how to manage database migrations when using the `news-entities` library.

## Architecture Overview

```
news-entities (Library)
├── Entity Definitions
├── Migration Files (Templates)
└── Migration Utilities

news-api (Application)          news-scraper (Application)
├── Uses news-entities          ├── Uses news-entities  
├── Runs own migrations         ├── Runs own migrations
└── Controls timing             └── Controls timing
```

## Key Principles

1. **Library provides schema definitions** - `news-entities` contains the canonical entity definitions
2. **Applications control execution** - Each app (`news-api`, `news-scraper`) runs migrations independently
3. **No auto-migrations** - Migrations are always explicit and controlled
4. **Shared migration files** - Migration templates are provided by the library but executed by apps

## Migration Workflow

### For New Applications

1. **Install news-entities**
   ```bash
   npm install news-entities
   ```

2. **Create migration runner script**
   ```typescript
   // scripts/migrate.ts
   import { MigrationRunner } from 'news-entities';
   
   const runner = new MigrationRunner({
     host: process.env.DB_HOST,
     port: parseInt(process.env.DB_PORT || '5432'),
     username: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
   });
   
   async function main() {
     const command = process.argv[2];
     
     try {
       switch (command) {
         case 'run':
           await runner.run();
           break;
         case 'revert':
           await runner.revert();
           break;
         case 'status':
           await runner.status();
           break;
         default:
           console.log('Usage: npm run migrate [run|revert|status]');
       }
     } catch (error) {
       console.error('Migration failed:', error);
       process.exit(1);
     } finally {
       await runner.destroy();
     }
   }
   
   main();
   ```

3. **Add package.json scripts**
   ```json
   {
     "scripts": {
       "migrate": "ts-node scripts/migrate.ts",
       "migrate:run": "npm run migrate run",
       "migrate:revert": "npm run migrate revert",
       "migrate:status": "npm run migrate status"
     }
   }
   ```

4. **Run initial migration**
   ```bash
   npm run migrate:run
   ```

### For Existing Applications (Like your current setup)

Since you already have data in production with Prisma, you'll need to:

1. **Create a baseline migration** that marks the initial schema as applied without executing it
2. **Migrate gradually** by running only new migrations going forward

Here's how to handle the transition:

```typescript
// scripts/migrate-from-prisma.ts
import { MigrationRunner, createMigrationDataSource } from 'news-entities';

async function migrateFromPrisma() {
  const dataSource = createMigrationDataSource({
    // your db config
  });
  
  await dataSource.initialize();
  
  // Mark the initial migration as already run (since you have existing data)
  await dataSource.query(`
    INSERT INTO typeorm_migrations (timestamp, name) 
    VALUES (1737000000000, 'InitialSchema1737000000000')
    ON CONFLICT DO NOTHING
  `);
  
  console.log('Marked initial schema as migrated');
  
  // Now run any new migrations
  const migrations = await dataSource.runMigrations();
  console.log(`Applied ${migrations.length} new migrations`);
  
  await dataSource.destroy();
}

migrateFromPrisma().catch(console.error);
```

## Creating New Migrations

When the schema needs to change:

### 1. Update Entities in news-entities

```typescript
// In news-entities/src/entities/article.entity.ts
@Entity('articles')
export class Article {
  // ... existing fields
  
  @Column({ nullable: true })
  newField: string; // Add new field
}
```

### 2. Generate Migration

```bash
cd news-entities
npm run migration:generate -- -n AddNewFieldToArticle
```

### 3. Review and Edit Migration

The generated migration will be in `src/migrations/`. Review and edit as needed.

### 4. Update Consuming Applications

```bash
# In news-api
npm run migrate:run

# In news-scraper  
npm run migrate:run
```

## Best Practices

### 1. **Always Test Migrations**
- Test migrations on a copy of production data
- Verify both `up` and `down` methods work correctly
- Test the migration in a transaction when possible

### 2. **Migration Naming Convention**
- Use descriptive names: `AddUserEmailIndex`, `RemoveDeprecatedColumn`
- Include timestamp for ordering: `1737000000001-AddUserEmailIndex`

### 3. **Backward Compatibility**
- When removing columns, first make them nullable in one migration
- Remove the column in a subsequent migration after code is updated
- Use multiple migrations for complex schema changes

### 4. **Environment Considerations**
- **Development**: Use `synchronize: true` for rapid iteration (optional)
- **Staging**: Always use migrations to match production
- **Production**: Never use `synchronize: true`, always use migrations

### 5. **Data Migrations**
- Separate data migrations from schema migrations when possible
- Use transactions for data integrity
- Consider performance impact on large tables

## Troubleshooting

### Migration Failed
```bash
# Check current status
npm run migrate:status

# Revert last migration
npm run migrate:revert

# Fix the issue and try again
npm run migrate:run
```

### Schema Drift
If entities and database get out of sync:

```bash
# Generate a sync migration (use carefully!)
npm run migration:generate -- -n SyncSchema
```

### Manual Migration Fixes
```typescript
// For manual fixes
const dataSource = createMigrationDataSource();
await dataSource.initialize();
await dataSource.query('-- your manual SQL here');
await dataSource.destroy();
```

## Vector Extensions

The initial migration includes PostgreSQL vector extension setup:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

This is handled automatically in the initial migration. For vector operations, embeddings are stored as JSON text and automatically transformed by the entities.

## Monitoring

Consider adding migration logging to your application startup:

```typescript
import { showMigrationStatus } from 'news-entities';

async function checkMigrationStatus() {
  const dataSource = createDataSource();
  await dataSource.initialize();
  
  const hasPendingMigrations = await dataSource.showMigrations();
  if (hasPendingMigrations) {
    console.warn('⚠️  Pending migrations detected. Run migrations before starting the application.');
    process.exit(1);
  }
  
  await dataSource.destroy();
}
``` 