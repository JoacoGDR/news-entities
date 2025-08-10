export const ARTICLE_TYPES = {
  OPINION: 'OPINION',
  ANALYSIS: 'ANALYSIS', 
  NEWS: 'NEWS',
  DISCARDED: 'DISCARDED',
} as const;

export const ARTICLE_CATEGORIES = {
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
} as const;

export const ARTICLE_SCOPES = {
  DOMESTIC: 'DOMESTIC',
  INTERNATIONAL: 'INTERNATIONAL',
} as const;

export const ECONOMIC_BIAS_LABELS = {
  FAR_LEFT: 'FAR_LEFT',
  LEFT: 'LEFT',
  CENTER_LEFT: 'CENTER_LEFT',
  CENTER: 'CENTER',
  CENTER_RIGHT: 'CENTER_RIGHT',
  RIGHT: 'RIGHT',
  FAR_RIGHT: 'FAR_RIGHT',
  NA: 'NA',
} as const;

export const SOCIAL_BIAS_LABELS = {
  VERY_PROGRESSIVE: 'VERY_PROGRESSIVE',
  PROGRESSIVE: 'PROGRESSIVE',
  SOMEWHAT_PROGRESSIVE: 'SOMEWHAT_PROGRESSIVE',
  CENTER: 'CENTER',
  SOMEWHAT_CONSERVATIVE: 'SOMEWHAT_CONSERVATIVE',
  CONSERVATIVE: 'CONSERVATIVE',
  VERY_CONSERVATIVE: 'VERY_CONSERVATIVE',
  NA: 'NA',
} as const;

export const SENTIMENT_LABELS = {
  VERY_CRITICAL: 'VERY_CRITICAL',
  CRITICAL: 'CRITICAL',
  SOMEWHAT_CRITICAL: 'SOMEWHAT_CRITICAL',
  NEUTRAL: 'NEUTRAL',
  SOMEWHAT_SUPPORTIVE: 'SOMEWHAT_SUPPORTIVE',
  SUPPORTIVE: 'SUPPORTIVE',
  VERY_SUPPORTIVE: 'VERY_SUPPORTIVE',
  NA: 'NA',
} as const;

export const URGENCY_LABELS = {
  LOW: 'LOW',
  MODERATE: 'MODERATE',
  HIGH: 'HIGH',
  BREAKING: 'BREAKING',
} as const;

export type ArticleType = (typeof ARTICLE_TYPES)[keyof typeof ARTICLE_TYPES];
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[keyof typeof ARTICLE_CATEGORIES];
export type ArticleScope = (typeof ARTICLE_SCOPES)[keyof typeof ARTICLE_SCOPES];
export type EconomicBiasLabel = (typeof ECONOMIC_BIAS_LABELS)[keyof typeof ECONOMIC_BIAS_LABELS];
export type SocialBiasLabel = (typeof SOCIAL_BIAS_LABELS)[keyof typeof SOCIAL_BIAS_LABELS];
export type SentimentLabel = (typeof SENTIMENT_LABELS)[keyof typeof SENTIMENT_LABELS];
export type UrgencyLabel = (typeof URGENCY_LABELS)[keyof typeof URGENCY_LABELS];

export const ARTICLE_TYPES_DESCRIPTIONS: Record<ArticleType, string> = {
  [ARTICLE_TYPES.OPINION]: "An article primarily intended to express the author's personal views, beliefs, or arguments on a current event or affair.",
  [ARTICLE_TYPES.ANALYSIS]: 'An article that interprets or contextualizes recent events, combining factual reporting with explanatory or evaluative content.',
  [ARTICLE_TYPES.NEWS]: 'An article focused on reporting current events or factual developments with minimal interpretation or commentary.',
  [ARTICLE_TYPES.DISCARDED]: `An article that will be discarded, if it meets any of the following conditions:
        1. Technical issues – The article failed to scrape properly (e.g., due to paywalls, missing content, or formatting errors).
        2. Non-news editorial content – Includes horoscopes, astrology, self-help pieces, or other entertainment/editorial content not rooted in factual current events.
        3. Routine informational content – Such as daily weather forecasts, lottery results, or other regularly scheduled public service updates.
        4. Non-current or historical content – Includes biographies, historical anecdotes, or retrospectives that are not directly tied to a current event or ongoing situation.
        5. Opinion or analysis with no clear news hook – Essays, opinion pieces, or analysis articles that are not grounded in a timely, newsworthy event or development.
        6. Lacks relevance or significance – Articles that may technically report on a current topic but are trivial, niche, or unlikely to be of general public interest.`
} as const;

export const ARTICLE_CATEGORIES_DESCRIPTIONS: Record<ArticleCategory, string> = {
  [ARTICLE_CATEGORIES.ECONOMY]: 'An article that focuses on economic trends, markets, and financial matters.',
  [ARTICLE_CATEGORIES.POLITICS]: 'An article that focuses on government, elections, and political affairs.',
  [ARTICLE_CATEGORIES.SOCIETY]: 'An article that focuses on social issues, demographics, and cultural topics.',
  [ARTICLE_CATEGORIES.TECHNOLOGY]: 'An article that focuses on technological innovations, digital trends, and tech industry.',
  [ARTICLE_CATEGORIES.SCIENCE]: 'An article that focuses on scientific research, discoveries, and academic findings.',
  [ARTICLE_CATEGORIES.HEALTH]: 'An article that focuses on medical news, public health, and healthcare policy.',
  [ARTICLE_CATEGORIES.SPORTS]: 'An article that focuses on athletic competitions, sports industry, and recreational activities.',
  [ARTICLE_CATEGORIES.ENTERTAINMENT]: 'An article that focuses on media, celebrities, arts, and popular culture.',
  [ARTICLE_CATEGORIES.ENVIRONMENT]: 'An article that focuses on climate change, conservation, and environmental policy.',
  [ARTICLE_CATEGORIES.EDUCATION]: 'An article that focuses on schools, universities, and educational policy.',
  [ARTICLE_CATEGORIES.CRIME]: 'An article that focuses on criminal activity, law enforcement, and legal proceedings.',
  [ARTICLE_CATEGORIES.BUSINESS]: 'An article that focuses on corporate news, industry developments, and business strategy.',
  [ARTICLE_CATEGORIES.WEATHER]: 'An article that focuses on weather conditions and meteorological events.',
  [ARTICLE_CATEGORIES.OTHER]: 'An article that does not fit into any of the other categories.',
} as const;

export const ARTICLE_SCOPES_DESCRIPTIONS: Record<ArticleScope, string> = {
  [ARTICLE_SCOPES.DOMESTIC]: 'An article that covers events or situations from the sources country.',
  [ARTICLE_SCOPES.INTERNATIONAL]: 'An article that covers events or situations from other countries, or world news.',
} as const;

export const ECONOMIC_BIAS_LABELS_DESCRIPTIONS: Record<EconomicBiasLabel, string> = {
  [ECONOMIC_BIAS_LABELS.FAR_LEFT]: 'Strongly favors full government control over economic activity',
  [ECONOMIC_BIAS_LABELS.LEFT]: 'Favors substantial government intervention in the economy',
  [ECONOMIC_BIAS_LABELS.CENTER_LEFT]: 'Favors moderate levels of government intervention',
  [ECONOMIC_BIAS_LABELS.CENTER]: 'Neutral or balanced view on government involvement in the economy',
  [ECONOMIC_BIAS_LABELS.CENTER_RIGHT]: 'Favors limited government intervention in markets',
  [ECONOMIC_BIAS_LABELS.RIGHT]: 'Favors minimal government regulation of the economy',
  [ECONOMIC_BIAS_LABELS.FAR_RIGHT]: 'Strongly favors free markets with little to no government involvement',
  [ECONOMIC_BIAS_LABELS.NA]: 'Not applicable or unclear',
} as const;

export const ECONOMIC_BIAS_NUMERIC_MAP: Record<EconomicBiasLabel, number | null> = {
  [ECONOMIC_BIAS_LABELS.FAR_LEFT]: -3,
  [ECONOMIC_BIAS_LABELS.LEFT]: -2,
  [ECONOMIC_BIAS_LABELS.CENTER_LEFT]: -1,
  [ECONOMIC_BIAS_LABELS.CENTER]: 0,
  [ECONOMIC_BIAS_LABELS.CENTER_RIGHT]: 1,
  [ECONOMIC_BIAS_LABELS.RIGHT]: 2,
  [ECONOMIC_BIAS_LABELS.FAR_RIGHT]: 3,
  [ECONOMIC_BIAS_LABELS.NA]: null,
} as const;

export const SOCIAL_BIAS_LABELS_DESCRIPTIONS: Record<SocialBiasLabel, string> = {
  [SOCIAL_BIAS_LABELS.VERY_PROGRESSIVE]: 'Strongly favors rapid social change and policies aimed at reshaping traditional norms',
  [SOCIAL_BIAS_LABELS.PROGRESSIVE]: 'Favors changes to existing social structures to address perceived injustices or disparities',
  [SOCIAL_BIAS_LABELS.SOMEWHAT_PROGRESSIVE]: 'Generally supports social change, but with some emphasis on gradual or limited reforms',
  [SOCIAL_BIAS_LABELS.CENTER]: 'Holds a balanced or mixed position on social issues, with no strong lean in either direction',
  [SOCIAL_BIAS_LABELS.SOMEWHAT_CONSERVATIVE]: 'Generally favors traditional social values, but open to some modern reforms',
  [SOCIAL_BIAS_LABELS.CONSERVATIVE]: 'Prefers to maintain established social norms and institutions',
  [SOCIAL_BIAS_LABELS.VERY_CONSERVATIVE]: 'Strongly favors preserving or restoring traditional social structures and cultural norms',
  [SOCIAL_BIAS_LABELS.NA]: 'Not applicable or unclear',
} as const;

export const SOCIAL_BIAS_NUMERIC_MAP: Record<SocialBiasLabel, number | null> = {
  [SOCIAL_BIAS_LABELS.VERY_PROGRESSIVE]: 3,
  [SOCIAL_BIAS_LABELS.PROGRESSIVE]: 2,
  [SOCIAL_BIAS_LABELS.SOMEWHAT_PROGRESSIVE]: 1,
  [SOCIAL_BIAS_LABELS.CENTER]: 0,
  [SOCIAL_BIAS_LABELS.SOMEWHAT_CONSERVATIVE]: -1,
  [SOCIAL_BIAS_LABELS.CONSERVATIVE]: -2,
  [SOCIAL_BIAS_LABELS.VERY_CONSERVATIVE]: -3,
  [SOCIAL_BIAS_LABELS.NA]: null,
} as const;

export const SENTIMENT_LABELS_DESCRIPTIONS: Record<SentimentLabel, string> = {
  [SENTIMENT_LABELS.VERY_CRITICAL]: 'Strongly disapproves of or opposes the subject in tone or language',
  [SENTIMENT_LABELS.CRITICAL]: 'Expresses clear disapproval or negative assessment of the subject',
  [SENTIMENT_LABELS.SOMEWHAT_CRITICAL]: 'Conveys mild disapproval or skepticism toward the subject',
  [SENTIMENT_LABELS.NEUTRAL]: 'Takes a balanced or impartial stance with no clear positive or negative tone',
  [SENTIMENT_LABELS.SOMEWHAT_SUPPORTIVE]: 'Expresses mild approval or favorable leanings toward the subject',
  [SENTIMENT_LABELS.SUPPORTIVE]: 'Conveys clear approval or endorsement of the subject',
  [SENTIMENT_LABELS.VERY_SUPPORTIVE]: 'Strongly endorses or praises the subject with highly positive language',
  [SENTIMENT_LABELS.NA]: 'Not applicable or unclear',
} as const;

export const SENTIMENT_SCORE_MAP: Record<SentimentLabel, number | null> = {
  [SENTIMENT_LABELS.VERY_CRITICAL]: -3,
  [SENTIMENT_LABELS.CRITICAL]: -2,
  [SENTIMENT_LABELS.SOMEWHAT_CRITICAL]: -1,
  [SENTIMENT_LABELS.NEUTRAL]: 0,
  [SENTIMENT_LABELS.SOMEWHAT_SUPPORTIVE]: 1,
  [SENTIMENT_LABELS.SUPPORTIVE]: 2,
  [SENTIMENT_LABELS.VERY_SUPPORTIVE]: 3,
  [SENTIMENT_LABELS.NA]: null,
} as const;

export const URGENCY_LABELS_DESCRIPTIONS: Record<UrgencyLabel, string> = {
  [URGENCY_LABELS.LOW]: "Not time-sensitive — information will remain relevant for weeks or months; no immediate developments expected. Examples: in-depth features, historical retrospectives, evergreen how-to guides.",
  [URGENCY_LABELS.MODERATE]: "Time-relevant but not critical — updates may occur over days; readers benefit from timely awareness but urgency is low. Examples: scheduled events, policy changes announced for the near future, sports match previews.",
  [URGENCY_LABELS.HIGH]: "Time-sensitive — important developments occurring now or soon; situation may change within hours. Examples: government announcements taking effect immediately, ongoing protests, market-moving business news.",
  [URGENCY_LABELS.BREAKING]: "Critical and unfolding — new information emerging rapidly; immediate updates essential. Examples: natural disasters, major accidents, sudden political events, significant security threats."
};

export const URGENCY_LABELS_NUMERIC_MAP: Record<UrgencyLabel, number | null> = {
  [URGENCY_LABELS.LOW]: 1,
  [URGENCY_LABELS.MODERATE]: 2,
  [URGENCY_LABELS.HIGH]: 3,
  [URGENCY_LABELS.BREAKING]: 4,
} as const;

export function mapUrgencyToNumber(label: UrgencyLabel): number | null {
  return URGENCY_LABELS_NUMERIC_MAP[label] ?? null;
}

export function mapEconomicBiasToNumber(
  label: EconomicBiasLabel
): number | null {
  return ECONOMIC_BIAS_NUMERIC_MAP[label] ?? null;
}

export function mapSocialBiasToNumber(label: SocialBiasLabel): number | null {
  return SOCIAL_BIAS_NUMERIC_MAP[label] ?? null;
}

export function mapSentimentToNumber(label: SentimentLabel): number | null {
  return SENTIMENT_SCORE_MAP[label] ?? null;
}

export function mapNumberToEconomicBias(value: number | null): EconomicBiasLabel {
  if (value === null) return ECONOMIC_BIAS_LABELS.NA;
  const entry = Object.entries(ECONOMIC_BIAS_NUMERIC_MAP).find(([, v]) => v === value);
  return (entry?.[0] as EconomicBiasLabel) || ECONOMIC_BIAS_LABELS.NA;
}

export function mapNumberToSocialBias(value: number | null): SocialBiasLabel {
  if (value === null) return SOCIAL_BIAS_LABELS.NA;
  const entry = Object.entries(SOCIAL_BIAS_NUMERIC_MAP).find(([, v]) => v === value);
  return (entry?.[0] as SocialBiasLabel) || SOCIAL_BIAS_LABELS.NA;
}

export function mapNumberToSentiment(value: number | null): SentimentLabel {
  if (value === null) return SENTIMENT_LABELS.NA;
  const entry = Object.entries(SENTIMENT_SCORE_MAP).find(([, v]) => v === value);
  return (entry?.[0] as SentimentLabel) || SENTIMENT_LABELS.NA;
}

export function isValidArticleType(type: string): type is ArticleType {
  return Object.values(ARTICLE_TYPES).includes(type as ArticleType);
}

export function isValidArticleCategory(category: string): category is ArticleCategory {
  return Object.values(ARTICLE_CATEGORIES).includes(category as ArticleCategory);
}

export function isValidArticleScope(scope: string): scope is ArticleScope {
  return Object.values(ARTICLE_SCOPES).includes(scope as ArticleScope);
}

export const ARTICLE_CLASSIFICATION_VALUES = {
  types: Object.values(ARTICLE_TYPES) as ArticleType[],
  categories: Object.values(ARTICLE_CATEGORIES) as ArticleCategory[],
  scopes: Object.values(ARTICLE_SCOPES) as ArticleScope[],
  economicBiasLabels: Object.values(ECONOMIC_BIAS_LABELS) as EconomicBiasLabel[],
  socialBiasLabels: Object.values(SOCIAL_BIAS_LABELS) as SocialBiasLabel[],
  sentimentLabels: Object.values(SENTIMENT_LABELS) as SentimentLabel[],
} as const;
