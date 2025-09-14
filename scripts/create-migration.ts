#!/usr/bin/env ts-node
import { writeFileSync } from 'fs';
import { join } from 'path';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: npm run create-migration -- MigrationName');
  process.exit(1);
}

const migrationName = args[0];
const timestamp = Date.now();
const className = `${migrationName}${timestamp}`;
const fileName = `${timestamp}-${migrationName}.ts`;

const template = `import { MigrationInterface, QueryRunner } from "typeorm";

export class ${className} implements MigrationInterface {
    name = '${className}'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // TODO: Add your migration SQL here
        // await queryRunner.query(\`ALTER TABLE "your_table" ADD "new_column" varchar\`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // TODO: Add your rollback SQL here
        // await queryRunner.query(\`ALTER TABLE "your_table" DROP COLUMN "new_column"\`);
    }
}`;

const filePath = join(__dirname, '..', 'src', 'migrations', fileName);
writeFileSync(filePath, template);

console.log(`✅ Created migration: ${fileName}`);
console.log(`📝 Edit the file and add your SQL commands`);
console.log(`🚀 Run with: npm run migration:run`);
