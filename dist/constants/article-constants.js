"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARTICLE_CLASSIFICATION_VALUES = exports.SENTIMENT_SCORE_MAP = exports.SENTIMENT_LABELS_DESCRIPTIONS = exports.SOCIAL_BIAS_NUMERIC_MAP = exports.SOCIAL_BIAS_LABELS_DESCRIPTIONS = exports.ECONOMIC_BIAS_NUMERIC_MAP = exports.ECONOMIC_BIAS_LABELS_DESCRIPTIONS = exports.ARTICLE_SCOPES_DESCRIPTIONS = exports.ARTICLE_CATEGORIES_DESCRIPTIONS = exports.ARTICLE_TYPES_DESCRIPTIONS = exports.SENTIMENT_LABELS = exports.SOCIAL_BIAS_LABELS = exports.ECONOMIC_BIAS_LABELS = exports.ARTICLE_SCOPES = exports.ARTICLE_CATEGORIES = exports.ARTICLE_TYPES = void 0;
exports.mapEconomicBiasToNumber = mapEconomicBiasToNumber;
exports.mapSocialBiasToNumber = mapSocialBiasToNumber;
exports.mapSentimentToNumber = mapSentimentToNumber;
exports.mapNumberToEconomicBias = mapNumberToEconomicBias;
exports.mapNumberToSocialBias = mapNumberToSocialBias;
exports.mapNumberToSentiment = mapNumberToSentiment;
exports.isValidArticleType = isValidArticleType;
exports.isValidArticleCategory = isValidArticleCategory;
exports.isValidArticleScope = isValidArticleScope;
exports.ARTICLE_TYPES = {
    OPINION: 'OPINION',
    ANALYSIS: 'ANALYSIS',
    NEWS: 'NEWS',
    DISCARDED: 'DISCARDED',
};
exports.ARTICLE_CATEGORIES = {
    ECONOMY: 'ECONOMY',
    POLITICS: 'POLITICS',
    SOCIETY: 'SOCIETY',
    TECHNOLOGY: 'TECHNOLOGY',
    SCIENCE: 'SCIENCE',
    HEALTH: 'HEALTH',
    SPORTS: 'SPORTS',
    ENTERTAINMENT: 'ENTERTAINMENT',
    ENVIRONMENT: 'ENVIRONMENT',
    EDUCATION: 'EDUCATION',
    CRIME: 'CRIME',
    BUSINESS: 'BUSINESS',
    WEATHER: 'WEATHER',
    OTHER: 'OTHER',
};
exports.ARTICLE_SCOPES = {
    DOMESTIC: 'DOMESTIC',
    INTERNATIONAL: 'INTERNATIONAL',
};
exports.ECONOMIC_BIAS_LABELS = {
    FAR_LEFT: 'FAR_LEFT',
    LEFT: 'LEFT',
    CENTER_LEFT: 'CENTER_LEFT',
    CENTER: 'CENTER',
    CENTER_RIGHT: 'CENTER_RIGHT',
    RIGHT: 'RIGHT',
    FAR_RIGHT: 'FAR_RIGHT',
    NA: 'NA',
};
exports.SOCIAL_BIAS_LABELS = {
    VERY_PROGRESSIVE: 'VERY_PROGRESSIVE',
    PROGRESSIVE: 'PROGRESSIVE',
    SOMEWHAT_PROGRESSIVE: 'SOMEWHAT_PROGRESSIVE',
    CENTER: 'CENTER',
    SOMEWHAT_CONSERVATIVE: 'SOMEWHAT_CONSERVATIVE',
    CONSERVATIVE: 'CONSERVATIVE',
    VERY_CONSERVATIVE: 'VERY_CONSERVATIVE',
    NA: 'NA',
};
exports.SENTIMENT_LABELS = {
    VERY_CRITICAL: 'VERY_CRITICAL',
    CRITICAL: 'CRITICAL',
    SOMEWHAT_CRITICAL: 'SOMEWHAT_CRITICAL',
    NEUTRAL: 'NEUTRAL',
    SOMEWHAT_SUPPORTIVE: 'SOMEWHAT_SUPPORTIVE',
    SUPPORTIVE: 'SUPPORTIVE',
    VERY_SUPPORTIVE: 'VERY_SUPPORTIVE',
    NA: 'NA',
};
exports.ARTICLE_TYPES_DESCRIPTIONS = {
    [exports.ARTICLE_TYPES.OPINION]: "An article primarily intended to express the author's personal views, beliefs, or arguments on a topic.",
    [exports.ARTICLE_TYPES.ANALYSIS]: 'An article that interprets or contextualizes recent events, combining factual reporting with explanatory or evaluative content.',
    [exports.ARTICLE_TYPES.NEWS]: 'An article focused on reporting current events or factual developments with minimal interpretation or commentary.',
    [exports.ARTICLE_TYPES.DISCARDED]: `An article that will be discarded, if it meets any of the following conditions:
      1. Failed to scrape properly (e.g., due to paywalls or formatting issues)
      2. Consist of horoscopes, astrology content, or similar non-news editorial content
      3. Is a weather forecast`,
};
exports.ARTICLE_CATEGORIES_DESCRIPTIONS = {
    [exports.ARTICLE_CATEGORIES.ECONOMY]: 'An article that focuses on economic trends, markets, and financial matters.',
    [exports.ARTICLE_CATEGORIES.POLITICS]: 'An article that focuses on government, elections, and political affairs.',
    [exports.ARTICLE_CATEGORIES.SOCIETY]: 'An article that focuses on social issues, demographics, and cultural topics.',
    [exports.ARTICLE_CATEGORIES.TECHNOLOGY]: 'An article that focuses on technological innovations, digital trends, and tech industry.',
    [exports.ARTICLE_CATEGORIES.SCIENCE]: 'An article that focuses on scientific research, discoveries, and academic findings.',
    [exports.ARTICLE_CATEGORIES.HEALTH]: 'An article that focuses on medical news, public health, and healthcare policy.',
    [exports.ARTICLE_CATEGORIES.SPORTS]: 'An article that focuses on athletic competitions, sports industry, and recreational activities.',
    [exports.ARTICLE_CATEGORIES.ENTERTAINMENT]: 'An article that focuses on media, celebrities, arts, and popular culture.',
    [exports.ARTICLE_CATEGORIES.ENVIRONMENT]: 'An article that focuses on climate change, conservation, and environmental policy.',
    [exports.ARTICLE_CATEGORIES.EDUCATION]: 'An article that focuses on schools, universities, and educational policy.',
    [exports.ARTICLE_CATEGORIES.CRIME]: 'An article that focuses on criminal activity, law enforcement, and legal proceedings.',
    [exports.ARTICLE_CATEGORIES.BUSINESS]: 'An article that focuses on corporate news, industry developments, and business strategy.',
    [exports.ARTICLE_CATEGORIES.WEATHER]: 'An article that focuses on weather conditions and meteorological events.',
    [exports.ARTICLE_CATEGORIES.OTHER]: 'An article that does not fit into any of the other categories.',
};
exports.ARTICLE_SCOPES_DESCRIPTIONS = {
    [exports.ARTICLE_SCOPES.DOMESTIC]: 'An article that covers events or situations from the sources country.',
    [exports.ARTICLE_SCOPES.INTERNATIONAL]: 'An article that covers events or situations from other countries, or world news.',
};
exports.ECONOMIC_BIAS_LABELS_DESCRIPTIONS = {
    [exports.ECONOMIC_BIAS_LABELS.FAR_LEFT]: 'Strongly favors full government control over economic activity',
    [exports.ECONOMIC_BIAS_LABELS.LEFT]: 'Favors substantial government intervention in the economy',
    [exports.ECONOMIC_BIAS_LABELS.CENTER_LEFT]: 'Favors moderate levels of government intervention',
    [exports.ECONOMIC_BIAS_LABELS.CENTER]: 'Neutral or balanced view on government involvement in the economy',
    [exports.ECONOMIC_BIAS_LABELS.CENTER_RIGHT]: 'Favors limited government intervention in markets',
    [exports.ECONOMIC_BIAS_LABELS.RIGHT]: 'Favors minimal government regulation of the economy',
    [exports.ECONOMIC_BIAS_LABELS.FAR_RIGHT]: 'Strongly favors free markets with little to no government involvement',
    [exports.ECONOMIC_BIAS_LABELS.NA]: 'Not applicable or unclear',
};
exports.ECONOMIC_BIAS_NUMERIC_MAP = {
    [exports.ECONOMIC_BIAS_LABELS.FAR_LEFT]: -3,
    [exports.ECONOMIC_BIAS_LABELS.LEFT]: -2,
    [exports.ECONOMIC_BIAS_LABELS.CENTER_LEFT]: -1,
    [exports.ECONOMIC_BIAS_LABELS.CENTER]: 0,
    [exports.ECONOMIC_BIAS_LABELS.CENTER_RIGHT]: 1,
    [exports.ECONOMIC_BIAS_LABELS.RIGHT]: 2,
    [exports.ECONOMIC_BIAS_LABELS.FAR_RIGHT]: 3,
    [exports.ECONOMIC_BIAS_LABELS.NA]: null,
};
exports.SOCIAL_BIAS_LABELS_DESCRIPTIONS = {
    [exports.SOCIAL_BIAS_LABELS.VERY_PROGRESSIVE]: 'Strongly favors rapid social change and policies aimed at reshaping traditional norms',
    [exports.SOCIAL_BIAS_LABELS.PROGRESSIVE]: 'Favors changes to existing social structures to address perceived injustices or disparities',
    [exports.SOCIAL_BIAS_LABELS.SOMEWHAT_PROGRESSIVE]: 'Generally supports social change, but with some emphasis on gradual or limited reforms',
    [exports.SOCIAL_BIAS_LABELS.CENTER]: 'Holds a balanced or mixed position on social issues, with no strong lean in either direction',
    [exports.SOCIAL_BIAS_LABELS.SOMEWHAT_CONSERVATIVE]: 'Generally favors traditional social values, but open to some modern reforms',
    [exports.SOCIAL_BIAS_LABELS.CONSERVATIVE]: 'Prefers to maintain established social norms and institutions',
    [exports.SOCIAL_BIAS_LABELS.VERY_CONSERVATIVE]: 'Strongly favors preserving or restoring traditional social structures and cultural norms',
    [exports.SOCIAL_BIAS_LABELS.NA]: 'Not applicable or unclear',
};
exports.SOCIAL_BIAS_NUMERIC_MAP = {
    [exports.SOCIAL_BIAS_LABELS.VERY_PROGRESSIVE]: 3,
    [exports.SOCIAL_BIAS_LABELS.PROGRESSIVE]: 2,
    [exports.SOCIAL_BIAS_LABELS.SOMEWHAT_PROGRESSIVE]: 1,
    [exports.SOCIAL_BIAS_LABELS.CENTER]: 0,
    [exports.SOCIAL_BIAS_LABELS.SOMEWHAT_CONSERVATIVE]: -1,
    [exports.SOCIAL_BIAS_LABELS.CONSERVATIVE]: -2,
    [exports.SOCIAL_BIAS_LABELS.VERY_CONSERVATIVE]: -3,
    [exports.SOCIAL_BIAS_LABELS.NA]: null,
};
exports.SENTIMENT_LABELS_DESCRIPTIONS = {
    [exports.SENTIMENT_LABELS.VERY_CRITICAL]: 'Strongly disapproves of or opposes the subject in tone or language',
    [exports.SENTIMENT_LABELS.CRITICAL]: 'Expresses clear disapproval or negative assessment of the subject',
    [exports.SENTIMENT_LABELS.SOMEWHAT_CRITICAL]: 'Conveys mild disapproval or skepticism toward the subject',
    [exports.SENTIMENT_LABELS.NEUTRAL]: 'Takes a balanced or impartial stance with no clear positive or negative tone',
    [exports.SENTIMENT_LABELS.SOMEWHAT_SUPPORTIVE]: 'Expresses mild approval or favorable leanings toward the subject',
    [exports.SENTIMENT_LABELS.SUPPORTIVE]: 'Conveys clear approval or endorsement of the subject',
    [exports.SENTIMENT_LABELS.VERY_SUPPORTIVE]: 'Strongly endorses or praises the subject with highly positive language',
    [exports.SENTIMENT_LABELS.NA]: 'Not applicable or unclear',
};
exports.SENTIMENT_SCORE_MAP = {
    [exports.SENTIMENT_LABELS.VERY_CRITICAL]: -3,
    [exports.SENTIMENT_LABELS.CRITICAL]: -2,
    [exports.SENTIMENT_LABELS.SOMEWHAT_CRITICAL]: -1,
    [exports.SENTIMENT_LABELS.NEUTRAL]: 0,
    [exports.SENTIMENT_LABELS.SOMEWHAT_SUPPORTIVE]: 1,
    [exports.SENTIMENT_LABELS.SUPPORTIVE]: 2,
    [exports.SENTIMENT_LABELS.VERY_SUPPORTIVE]: 3,
    [exports.SENTIMENT_LABELS.NA]: null,
};
function mapEconomicBiasToNumber(label) {
    return exports.ECONOMIC_BIAS_NUMERIC_MAP[label] ?? null;
}
function mapSocialBiasToNumber(label) {
    return exports.SOCIAL_BIAS_NUMERIC_MAP[label] ?? null;
}
function mapSentimentToNumber(label) {
    return exports.SENTIMENT_SCORE_MAP[label] ?? null;
}
function mapNumberToEconomicBias(value) {
    if (value === null)
        return exports.ECONOMIC_BIAS_LABELS.NA;
    const entry = Object.entries(exports.ECONOMIC_BIAS_NUMERIC_MAP).find(([, v]) => v === value);
    return entry?.[0] || exports.ECONOMIC_BIAS_LABELS.NA;
}
function mapNumberToSocialBias(value) {
    if (value === null)
        return exports.SOCIAL_BIAS_LABELS.NA;
    const entry = Object.entries(exports.SOCIAL_BIAS_NUMERIC_MAP).find(([, v]) => v === value);
    return entry?.[0] || exports.SOCIAL_BIAS_LABELS.NA;
}
function mapNumberToSentiment(value) {
    if (value === null)
        return exports.SENTIMENT_LABELS.NA;
    const entry = Object.entries(exports.SENTIMENT_SCORE_MAP).find(([, v]) => v === value);
    return entry?.[0] || exports.SENTIMENT_LABELS.NA;
}
function isValidArticleType(type) {
    return Object.values(exports.ARTICLE_TYPES).includes(type);
}
function isValidArticleCategory(category) {
    return Object.values(exports.ARTICLE_CATEGORIES).includes(category);
}
function isValidArticleScope(scope) {
    return Object.values(exports.ARTICLE_SCOPES).includes(scope);
}
exports.ARTICLE_CLASSIFICATION_VALUES = {
    types: Object.values(exports.ARTICLE_TYPES),
    categories: Object.values(exports.ARTICLE_CATEGORIES),
    scopes: Object.values(exports.ARTICLE_SCOPES),
    economicBiasLabels: Object.values(exports.ECONOMIC_BIAS_LABELS),
    socialBiasLabels: Object.values(exports.SOCIAL_BIAS_LABELS),
    sentimentLabels: Object.values(exports.SENTIMENT_LABELS),
};
//# sourceMappingURL=article-constants.js.map