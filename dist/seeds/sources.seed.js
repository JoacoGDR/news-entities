"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARTICLE_CATEGORIES = void 0;
exports.seedSources = seedSources;
require("reflect-metadata");
const data_source_1 = require("../data-source");
const source_entity_1 = require("../entities/source.entity");
const entities_1 = require("../entities");
const sampleSources = [
    {
        name: 'Clarín',
        rssFeedUrl: 'https://www.clarin.com/rss/lo-ultimo/',
        domain: 'clarin.com',
        location: 'Argentina',
    },
    {
        name: 'Pagina 12',
        rssFeedUrl: 'https://www.pagina12.com.ar/rss/portada',
        domain: 'pagina12.com.ar',
        location: 'Argentina',
    },
    {
        name: 'Perfil',
        rssFeedUrl: 'https://www.perfil.com/feed',
        domain: 'perfil.com',
        location: 'Argentina',
    },
];
exports.ARTICLE_CATEGORIES = {
    ECONOMY: {
        description: 'An article that focuses on economic trends, markets, and financial matters.',
        storyTrigger: true,
    },
    POLITICS: {
        description: 'An article that focuses on government, elections, and political affairs.',
        storyTrigger: true,
    },
    SOCIETY: {
        description: 'An article that focuses on social issues, demographics, and cultural topics.',
        storyTrigger: true,
    },
    TECHNOLOGY: {
        description: 'An article that focuses on technological innovations, digital trends, and tech industry.',
        storyTrigger: true,
    },
    SCIENCE: {
        description: 'An article that focuses on scientific research, discoveries, and academic findings.',
        storyTrigger: true,
    },
    HEALTH: {
        description: 'An article that focuses on medical news, public health, and healthcare policy.',
        storyTrigger: true,
    },
    SPORTS: {
        description: 'An article that focuses on athletic competitions, sports industry, and recreational activities.',
        storyTrigger: true,
    },
    ENTERTAINMENT: {
        description: 'An article that focuses on media, celebrities, arts, and popular culture.',
        storyTrigger: true,
    },
    ENVIRONMENT: {
        description: 'An article that focuses on climate change, conservation, and environmental policy.',
        storyTrigger: true,
    },
    EDUCATION: {
        description: 'An article that focuses on schools, universities, and educational policy.',
        storyTrigger: true,
    },
    CRIME: {
        description: 'An article that focuses on criminal activity, law enforcement, and legal proceedings.',
        storyTrigger: true,
    },
    BUSINESS: {
        description: 'An article that focuses on corporate news, industry developments, and business strategy.',
        storyTrigger: true,
    },
    WEATHER: {
        description: 'An article that focuses on weather conditions and meteorological events.',
        storyTrigger: false,
    },
    OTHER: {
        description: 'An article that does not fit into any of the other categories.',
        storyTrigger: false,
    },
};
const sampleCategories = Object.entries(exports.ARTICLE_CATEGORIES).map(([name, { description, storyTrigger }]) => ({
    name,
    description,
    storyTrigger,
}));
async function seedSources() {
    try {
        console.log('🌱 Starting sources seed...');
        if (!data_source_1.AppDataSource.isInitialized) {
            await data_source_1.AppDataSource.initialize();
            console.log('📡 Database connection initialized');
        }
        const sourceRepository = data_source_1.AppDataSource.getRepository(source_entity_1.Source);
        const existingCount = await sourceRepository.count();
        if (existingCount > 0) {
            console.log(`⚠️  Found ${existingCount} existing sources. Skipping seed.`);
            return;
        }
        const sources = sampleSources.map(sourceData => {
            const source = new source_entity_1.Source();
            source.name = sourceData.name;
            source.rssFeedUrl = sourceData.rssFeedUrl;
            source.domain = sourceData.domain;
            source.location = sourceData.location;
            source.lastFetchedAt = new Date();
            return source;
        });
        await sourceRepository.save(sources);
        const categoryRepository = data_source_1.AppDataSource.getRepository(entities_1.Category);
        const categories = sampleCategories.map(categoryData => {
            const category = new entities_1.Category();
            category.name = categoryData.name;
            category.description = categoryData.description;
            category.storyTrigger = categoryData.storyTrigger;
            return category;
        });
        await categoryRepository.save(categories);
        console.log(`✅ Successfully seeded ${sources.length} sources and ${categories.length} categories:`);
        sources.forEach(source => {
            console.log(`   📰 ${source.name} (${source.location})`);
        });
        console.log(`📂 Categories with story trigger:`);
        categories.forEach(category => {
            const trigger = category.storyTrigger ? '✓' : '✗';
            console.log(`   ${trigger} ${category.name}`);
        });
    }
    catch (error) {
        console.error('❌ Error seeding sources:', error);
        throw error;
    }
}
if (require.main === module) {
    seedSources()
        .then(() => {
        console.log('🎉 Sources seed completed successfully');
        process.exit(0);
    })
        .catch((error) => {
        console.error('💥 Sources seed failed:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=sources.seed.js.map