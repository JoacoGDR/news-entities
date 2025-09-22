export const ARTICLE_TYPES = {
  OPINION: 'OPINION',
  ANALYSIS: 'ANALISIS',
  NEWS: 'NOTICIA',
  DISCARDED: 'DESCARTADO',
} as const;

export const ARTICLE_CATEGORIES = {
  ECONOMY: 'ECONOMIA',
  POLITICS: 'POLITICA',
  SOCIETY: 'SOCIEDAD',
  TECHNOLOGY: 'TECNOLOGIA',
  SCIENCE: 'CIENCIA',
  HEALTH: 'SALUD',
  SPORTS: 'DEPORTES',
  ENTERTAINMENT: 'ENTRETENIMIENTO',
  ENVIRONMENT: 'MEDIO AMBIENTE',
  EDUCATION: 'EDUCACION',
  CRIME: 'CRIMEN',
  BUSINESS: 'NEGOCIOS',
  WEATHER: 'CLIMA',
  OTHER: 'OTRO',
} as const;

export const ARTICLE_SCOPES = {
  DOMESTIC: 'DOMESTICO',
  INTERNATIONAL: 'INTERNACIONAL',
} as const;

export const BIAS_LABELS = {
  FAR_LEFT: 'EXTREMA IZQUIERDA',
  LEFT: 'IZQUIERDA',
  LEAN_LEFT: 'CENTRO IZQUIERDA',
  CENTER: 'CENTRO',
  LEAN_RIGHT: 'LEAN_RIGHT',
  RIGHT: 'DERECHA',
  FAR_RIGHT: 'EXTREMA DERECHA',
  NA: 'NO DETERMINADO',
} as const;

export type ArticleType = (typeof ARTICLE_TYPES)[keyof typeof ARTICLE_TYPES];
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[keyof typeof ARTICLE_CATEGORIES];
export type ArticleScope = (typeof ARTICLE_SCOPES)[keyof typeof ARTICLE_SCOPES];
export type BiasLabel = (typeof BIAS_LABELS)[keyof typeof BIAS_LABELS];

export const ARTICLE_TYPES_DESCRIPTIONS: Record<ArticleType, string> = {
  [ARTICLE_TYPES.OPINION]: "Un artículo cuyo objetivo principal es expresar las opiniones, creencias o argumentos personales del autor sobre un evento o asunto actual.",
  [ARTICLE_TYPES.ANALYSIS]: "Un artículo que interpreta o contextualiza eventos recientes, combinando información factual con contenido explicativo o evaluativo.",
  [ARTICLE_TYPES.NEWS]: "Un artículo enfocado en reportar eventos actuales o desarrollos factuales con mínima interpretación o comentario.",
  [ARTICLE_TYPES.DISCARDED]: `Un artículo que debe ser descartado si cumple con alguna de las siguientes condiciones:
        1. Problemas técnicos – El artículo no se extrajo correctamente (por ejemplo, por paywalls, contenido faltante o errores de formato).
        2. Contenido editorial no informativo – Incluye horóscopos, astrología, loterías, artículos de autoayuda u otros contenidos de entretenimiento/editoriales sin base en hechos actuales.
        3. Contenido informativo rutinario – Como pronósticos del clima diario, resultados de lotería u otras actualizaciones de servicio público programadas regularmente.
        4. Contenido no actual o histórico – Incluye biografías, anécdotas históricas o retrospectivas que no están directamente relacionadas con un evento actual o situación en curso.
        5. Opinión o análisis sin conexión clara con la actualidad – Ensayos, columnas de opinión o artículos analíticos que no están fundamentados en un evento o desarrollo noticioso reciente.
        6. Falta de relevancia o significancia – Artículos que técnicamente informan sobre un tema actual pero que son triviales, muy nicho o poco relevantes para el público general.`
} as const;

export const BIAS_LABELS_DESCRIPTIONS: Record<BiasLabel, string> = {
  [BIAS_LABELS.FAR_LEFT]: 'Sesgo muy marcado. Postura marxista, trotskista, anti-capitalista, revolucionaria. Rechazo total del sistema capitalista, fuerte oposición a gobiernos liberales, defensa radical de los trabajadores, antiimperialismo.',
  [BIAS_LABELS.LEFT]: 'Colectivista, socialista, progresista, popular. Cree en una fuerte intervencion del estado en la economia y la sociedad. Rechazo al liberalismo. No tan fanatico como extrema izquierda.',
  [BIAS_LABELS.LEAN_LEFT]: 'Social democracia. Moderadamente progresista. Colectivista. Cree que la salida es el estado presente y que la solucion es eficientizarlo en lugar de achicarlo.',
  [BIAS_LABELS.CENTER]: 'No se puede detectar un sesgo.',
  [BIAS_LABELS.LEAN_RIGHT]: 'Moderadamente liberal. Cree en que hay que tener un estado mas chico pero tambien cree en que el estado tiene un rol importante.',
  [BIAS_LABELS.RIGHT]: 'Individualista. Liberal o conservador claro, pro mercado, pro “orden”, pero no tan fanatico o ideologico como extrema derecha.',
  [BIAS_LABELS.FAR_RIGHT]: 'Sesgo muy marcado. Ultraliberal, anti-Estado, el estado es el enemigo. Pro libertad economica y orden. El estado solo debe existir para la seguridad y la justicia.',
  [BIAS_LABELS.NA]: 'El artículo no es de caracter político u económico.',
} as const;

export const ARTICLE_SCOPES_DESCRIPTIONS: Record<ArticleScope, string> = {
  [ARTICLE_SCOPES.DOMESTIC]: 'Un artículo que cubre eventos o situaciones desde el país de origen.',
  [ARTICLE_SCOPES.INTERNATIONAL]: 'Un artículo que cubre eventos o situaciones desde otros países, o noticias mundiales.',
} as const;

export const BIAS_NUMERIC_MAP: Record<BiasLabel, number | null> = {
  [BIAS_LABELS.FAR_LEFT]: -3,
  [BIAS_LABELS.LEFT]: -2,
  [BIAS_LABELS.LEAN_LEFT]: -1,
  [BIAS_LABELS.CENTER]: 0,
  [BIAS_LABELS.LEAN_RIGHT]: 1,
  [BIAS_LABELS.RIGHT]: 2,
  [BIAS_LABELS.FAR_RIGHT]: 3,
  [BIAS_LABELS.NA]: null,
} as const;

export function mapBiasToNumber(label: BiasLabel): number | null {
  return BIAS_NUMERIC_MAP[label] ?? null;
}

export function mapNumberToBias(value: number | null): BiasLabel {
  if (value === null) return BIAS_LABELS.NA;
  const entry = Object.entries(BIAS_NUMERIC_MAP).find(([, v]) => v === value);
  return (entry?.[0] as BiasLabel) || BIAS_LABELS.NA;
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
  biasLabels: Object.values(BIAS_LABELS) as BiasLabel[],
} as const;
