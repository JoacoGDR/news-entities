# News Entities

Shared TypeORM entities and database migrations for the news application ecosystem.

## Installation

```bash
npm install news-entities
```

## Usage

### Basic Usage

```typescript
import { AppDataSource, Article, Story, Source } from 'news-entities';

// Initialize the data source
await AppDataSource.initialize();

// Use entities in your repositories
const articleRepository = AppDataSource.getRepository(Article);
const articles = await articleRepository.find();
```

### Custom Data Source Configuration

```typescript
import { createDataSource } from 'news-entities';

const customDataSource = createDataSource({
  host: 'custom-host',
  port: 5433,
  database: 'custom_db',
});

await customDataSource.initialize();
```

## Environment Variables

The following environment variables can be used to configure the database connection:

- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_USERNAME` - Database username (default: postgres)
- `DB_PASSWORD` - Database password (default: password)
- `DB_NAME` - Database name (default: news_db)
- `NODE_ENV` - Environment (set to 'development' for logging)

## Migrations

⚠️ **Important**: Since this is a library package, it provides migration files and utilities but **does not run migrations automatically**. Each consuming application must manage its own migration execution.

### Quick Start for Applications

```typescript
import { MigrationRunner } from 'news-entities';

const runner = new MigrationRunner({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Run migrations
await runner.run();
```

### For Existing Applications (Migrating from Prisma)

If you're migrating from Prisma to TypeORM, see the detailed guide in [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md).

### Migration Management Scripts

Add these to your application's `package.json`:

```json
{
  "scripts": {
    "migrate:run": "node scripts/migrate.js run",
    "migrate:revert": "node scripts/migrate.js revert", 
    "migrate:status": "node scripts/migrate.js status"
  }
}
```

### Creating New Migrations

New migrations should be created in the `news-entities` repository:

```bash
# In news-entities directory
npm run migration:generate -- -n MigrationName
```

📖 **See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for complete documentation**

## Entities

### Core Entities

- **Source** - RSS feed sources
- **RssFeed** - RSS feed
- **RssEntry** - Raw RSS feed entries
- **ScrapedArticle** - Scraped content from RSS entries
- **Article** - Processed articles with AI analysis
- **Story** - Collections of related articles
- **StoryDevelopment** - A development of a Story
- **Fact** - Facts extracted from stories
- **Tag** - Tags associated with stories


## Vector Embeddings

The following entities support vector embeddings for similarity search:

- Article.embedding
- Fact.embedding  
- Tag.embedding

**Important**: 
- Database columns are `VECTOR(1536)` (PostgreSQL vector extension)
- Entity properties are `string | null` for TypeORM compatibility
- Use raw SQL queries for vector operations (e.g., `embedding <-> target_embedding`)

Example vector similarity query:
```sql
SELECT id, title, (embedding <-> $1) AS distance 
FROM articles 
ORDER BY embedding <-> $1 
LIMIT 10
```

## Development

### Building

```bash
npm run build
```

### Watch Mode

```bash
npm run build:watch
```

### How to start up databases and run migrations
```bash
npm run build
npm run reset-db
npm run seed
```