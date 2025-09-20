import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Source } from '../entities/source.entity';
import { Category } from '../entities';
import { RssFeed } from '../entities/rss-feed.entity';

const sampleSources = [
  {
    name: 'Clarín',
    rssFeeds: [
      {
        url: 'https://www.clarin.com/rss/politica/',
      },
      {
        url: 'https://www.clarin.com/rss/economia/',
      },
    ],
    domain: 'clarin.com',
    location: 'Argentina',
  },
  {
    name: 'Pagina 12',
    rssFeeds: [
      {
        url: 'https://www.pagina12.com.ar/rss/secciones/economia/notas',
      },
      {
        url: 'https://www.pagina12.com.ar/rss/secciones/el-pais/notas',
      },
    ],
    domain: 'pagina12.com.ar',
    location: 'Argentina',
  },
  {
    name: 'Perfil',
    rssFeeds: [
      {
        url: 'https://www.perfil.com/feed/economia',
      },
      {
        url: 'https://www.perfil.com/feed/politica',
      },
    ],
    domain: 'perfil.com',
    location: 'Argentina',
  },
  {
    name: 'La Nacion',
    rssFeeds: [
      {
        url: 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/politica/?outputType=xml',
      },
      {
        url: 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/economia/?outputType=xml',
      },
    ],
    domain: 'lanacion.com.ar',
    location: 'Argentina',
  },
  {
    name: 'La Derecha Diario',
    rssFeeds: [
      {
        url: 'https://derechadiario.com.ar/rss/cat/economia',
      },
      {
        url: 'https://derechadiario.com.ar/rss/cat/politica',
      },
    ],
    domain: 'derechadiario.com.ar',
    location: 'Argentina',
  },
  {
    name: 'Infobae',
    rssFeeds: [
      {
        url: 'https://www.infobae.com/arc/outboundfeeds/rss/category/economia/?outputType=xml',
      },
      {
        url: 'https://www.infobae.com/arc/outboundfeeds/rss/category/politica/?outputType=xml',
      },
    ],
    domain: 'infobae.com',
    location: 'Argentina',
  }
];

export const ARTICLE_CATEGORIES = {
  ECONOMIA: {
    name: 'ECONOMIA',
    description: 'An article that focuses on economic trends, markets, and financial matters.',
    storyTrigger: true,
  },
  POLITICA: {
    name: 'POLITICA',
    description: 'An article that focuses on government, elections, and political affairs.',
    storyTrigger: true,
  },
  SOCIEDAD: {
    name: 'SOCIEDAD',
    description: 'An article that focuses on social issues, demographics, and cultural topics.',
    storyTrigger: false,
  },
  TECNOLOGIA: {
    name: 'TECNOLOGIA',
    description: 'An article that focuses on technological innovations, digital trends, and tech industry.',
    storyTrigger: false,
  },
  CIENCIA: {
    name: 'CIENCIA',
    description: 'An article that focuses on scientific research, discoveries, and academic findings.',
    storyTrigger: false,
  },
  SALUD: {
    name: 'SALUD',
    description: 'An article that focuses on medical news, public health, and healthcare policy.',
    storyTrigger: false,
  },
  DEPORTES: {
    name: 'DEPORTES',
    description: 'An article that focuses on athletic competitions, sports industry, and recreational activities.',
    storyTrigger: false,
  },
  ENTRETENIMIENTO: {
    name: 'ENTRETENIMIENTO',
    description: 'An article that focuses on media, celebrities, arts, and popular culture.',
    storyTrigger: false,
  },
  MEDIO_AMBIENTE: {
    name: 'MEDIO AMBIENTE',
    description: 'An article that focuses on climate change, conservation, and environmental policy.',
    storyTrigger: false,
  },
  EDUCACION: {
    name: 'EDUCACION',
    description: 'An article that focuses on schools, universities, and educational policy.',
    storyTrigger: false,
  },
  CRIMEN: {
    name: 'CRIMEN',
    description: 'An article that focuses on criminal activity, law enforcement, and legal proceedings.',
    storyTrigger: false,
  },
  NEGOCIOS: {
    name: 'NEGOCIOS',
    description: 'An article that focuses on corporate news, industry developments, and business strategy.',
    storyTrigger: false,
  },
  CLIMA: {
    name: 'CLIMA',
    description: 'An article that focuses on weather conditions and meteorological events.',
    storyTrigger: false,
  },
  OTRO: {
    name: 'OTRO',
    description: 'An article that does not fit into any of the other categories.',
    storyTrigger: false,
  },
} as const;


const sampleCategories = Object.entries(ARTICLE_CATEGORIES).map(([_,{ name, description, storyTrigger }]) => ({
  name,
  description,
  storyTrigger,
}));


export async function seedSources(): Promise<void> {
  try {
    console.log('🌱 Starting sources seed...');

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('📡 Database connection initialized');
    }

    const sourceRepository = AppDataSource.getRepository(Source);

    const existingCount = await sourceRepository.count();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing sources. Skipping seed.`);
      return;
    }

    const sources = sampleSources.map(sourceData => {
      const source = new Source();
      source.name = sourceData.name;
      source.rssFeeds = sourceData.rssFeeds.map(rssFeedData => {
        const rssFeed = new RssFeed();
        rssFeed.url = rssFeedData.url;
        return rssFeed;
      });
      source.domain = sourceData.domain;
      source.location = sourceData.location;
      source.lastFetchedAt = new Date();
      return source;
    });

    await sourceRepository.save(sources);

    const categoryRepository = AppDataSource.getRepository(Category);

    const categories = sampleCategories.map(categoryData => {
      const category = new Category();
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

  } catch (error) {
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
