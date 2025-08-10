export declare const ARTICLE_TYPES: {
    readonly OPINION: "OPINION";
    readonly ANALYSIS: "ANALYSIS";
    readonly NEWS: "NEWS";
    readonly DISCARDED: "DISCARDED";
};
export declare const ARTICLE_CATEGORIES: {
    readonly ECONOMY: "ECONOMY";
    readonly POLITICS: "POLITICS";
    readonly SOCIETY: "SOCIETY";
    readonly TECHNOLOGY: "TECHNOLOGY";
    readonly SCIENCE: "SCIENCE";
    readonly HEALTH: "HEALTH";
    readonly SPORTS: "SPORTS";
    readonly ENTERTAINMENT: "ENTERTAINMENT";
    readonly ENVIRONMENT: "ENVIRONMENT";
    readonly EDUCATION: "EDUCATION";
    readonly CRIME: "CRIME";
    readonly BUSINESS: "BUSINESS";
    readonly WEATHER: "WEATHER";
    readonly OTHER: "OTHER";
};
export declare const ARTICLE_SCOPES: {
    readonly DOMESTIC: "DOMESTIC";
    readonly INTERNATIONAL: "INTERNATIONAL";
};
export declare const ECONOMIC_BIAS_LABELS: {
    readonly FAR_LEFT: "FAR_LEFT";
    readonly LEFT: "LEFT";
    readonly CENTER_LEFT: "CENTER_LEFT";
    readonly CENTER: "CENTER";
    readonly CENTER_RIGHT: "CENTER_RIGHT";
    readonly RIGHT: "RIGHT";
    readonly FAR_RIGHT: "FAR_RIGHT";
    readonly NA: "NA";
};
export declare const SOCIAL_BIAS_LABELS: {
    readonly VERY_PROGRESSIVE: "VERY_PROGRESSIVE";
    readonly PROGRESSIVE: "PROGRESSIVE";
    readonly SOMEWHAT_PROGRESSIVE: "SOMEWHAT_PROGRESSIVE";
    readonly CENTER: "CENTER";
    readonly SOMEWHAT_CONSERVATIVE: "SOMEWHAT_CONSERVATIVE";
    readonly CONSERVATIVE: "CONSERVATIVE";
    readonly VERY_CONSERVATIVE: "VERY_CONSERVATIVE";
    readonly NA: "NA";
};
export declare const SENTIMENT_LABELS: {
    readonly VERY_CRITICAL: "VERY_CRITICAL";
    readonly CRITICAL: "CRITICAL";
    readonly SOMEWHAT_CRITICAL: "SOMEWHAT_CRITICAL";
    readonly NEUTRAL: "NEUTRAL";
    readonly SOMEWHAT_SUPPORTIVE: "SOMEWHAT_SUPPORTIVE";
    readonly SUPPORTIVE: "SUPPORTIVE";
    readonly VERY_SUPPORTIVE: "VERY_SUPPORTIVE";
    readonly NA: "NA";
};
export type ArticleType = (typeof ARTICLE_TYPES)[keyof typeof ARTICLE_TYPES];
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[keyof typeof ARTICLE_CATEGORIES];
export type ArticleScope = (typeof ARTICLE_SCOPES)[keyof typeof ARTICLE_SCOPES];
export type EconomicBiasLabel = (typeof ECONOMIC_BIAS_LABELS)[keyof typeof ECONOMIC_BIAS_LABELS];
export type SocialBiasLabel = (typeof SOCIAL_BIAS_LABELS)[keyof typeof SOCIAL_BIAS_LABELS];
export type SentimentLabel = (typeof SENTIMENT_LABELS)[keyof typeof SENTIMENT_LABELS];
export declare const ARTICLE_TYPES_DESCRIPTIONS: Record<ArticleType, string>;
export declare const ARTICLE_CATEGORIES_DESCRIPTIONS: Record<ArticleCategory, string>;
export declare const ARTICLE_SCOPES_DESCRIPTIONS: Record<ArticleScope, string>;
export declare const ECONOMIC_BIAS_LABELS_DESCRIPTIONS: Record<EconomicBiasLabel, string>;
export declare const ECONOMIC_BIAS_NUMERIC_MAP: Record<EconomicBiasLabel, number | null>;
export declare const SOCIAL_BIAS_LABELS_DESCRIPTIONS: Record<SocialBiasLabel, string>;
export declare const SOCIAL_BIAS_NUMERIC_MAP: Record<SocialBiasLabel, number | null>;
export declare const SENTIMENT_LABELS_DESCRIPTIONS: Record<SentimentLabel, string>;
export declare const SENTIMENT_SCORE_MAP: Record<SentimentLabel, number | null>;
export declare function mapEconomicBiasToNumber(label: EconomicBiasLabel): number | null;
export declare function mapSocialBiasToNumber(label: SocialBiasLabel): number | null;
export declare function mapSentimentToNumber(label: SentimentLabel): number | null;
export declare function mapNumberToEconomicBias(value: number | null): EconomicBiasLabel;
export declare function mapNumberToSocialBias(value: number | null): SocialBiasLabel;
export declare function mapNumberToSentiment(value: number | null): SentimentLabel;
export declare function isValidArticleType(type: string): type is ArticleType;
export declare function isValidArticleCategory(category: string): category is ArticleCategory;
export declare function isValidArticleScope(scope: string): scope is ArticleScope;
export declare const ARTICLE_CLASSIFICATION_VALUES: {
    readonly types: ArticleType[];
    readonly categories: ArticleCategory[];
    readonly scopes: ArticleScope[];
    readonly economicBiasLabels: EconomicBiasLabel[];
    readonly socialBiasLabels: SocialBiasLabel[];
    readonly sentimentLabels: SentimentLabel[];
};
//# sourceMappingURL=article-constants.d.ts.map