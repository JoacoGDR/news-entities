import 'reflect-metadata';
export declare const ARTICLE_CATEGORIES: {
    readonly ECONOMY: {
        readonly description: "An article that focuses on economic trends, markets, and financial matters.";
        readonly storyTrigger: true;
    };
    readonly POLITICS: {
        readonly description: "An article that focuses on government, elections, and political affairs.";
        readonly storyTrigger: true;
    };
    readonly SOCIETY: {
        readonly description: "An article that focuses on social issues, demographics, and cultural topics.";
        readonly storyTrigger: true;
    };
    readonly TECHNOLOGY: {
        readonly description: "An article that focuses on technological innovations, digital trends, and tech industry.";
        readonly storyTrigger: true;
    };
    readonly SCIENCE: {
        readonly description: "An article that focuses on scientific research, discoveries, and academic findings.";
        readonly storyTrigger: true;
    };
    readonly HEALTH: {
        readonly description: "An article that focuses on medical news, public health, and healthcare policy.";
        readonly storyTrigger: true;
    };
    readonly SPORTS: {
        readonly description: "An article that focuses on athletic competitions, sports industry, and recreational activities.";
        readonly storyTrigger: true;
    };
    readonly ENTERTAINMENT: {
        readonly description: "An article that focuses on media, celebrities, arts, and popular culture.";
        readonly storyTrigger: true;
    };
    readonly ENVIRONMENT: {
        readonly description: "An article that focuses on climate change, conservation, and environmental policy.";
        readonly storyTrigger: true;
    };
    readonly EDUCATION: {
        readonly description: "An article that focuses on schools, universities, and educational policy.";
        readonly storyTrigger: true;
    };
    readonly CRIME: {
        readonly description: "An article that focuses on criminal activity, law enforcement, and legal proceedings.";
        readonly storyTrigger: true;
    };
    readonly BUSINESS: {
        readonly description: "An article that focuses on corporate news, industry developments, and business strategy.";
        readonly storyTrigger: true;
    };
    readonly WEATHER: {
        readonly description: "An article that focuses on weather conditions and meteorological events.";
        readonly storyTrigger: false;
    };
    readonly OTHER: {
        readonly description: "An article that does not fit into any of the other categories.";
        readonly storyTrigger: false;
    };
};
export declare function seedSources(): Promise<void>;
//# sourceMappingURL=sources.seed.d.ts.map