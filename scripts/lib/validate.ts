import type { Category, CategorySheet, Sheet, SourceCard, Tier } from './types.ts';

export const FREE_CARD_COUNT = 30;

export interface ValidateOptions {
  /** Id, для яких є `images/<id>.png`. */
  imageIds: ReadonlySet<string>;
  /** Мови, які вже є в опублікованому маніфесті. */
  publishedLocales: readonly string[];
  /** Вимагати рівно `FREE_CARD_COUNT` безкоштовних карток. */
  requireFreeCount: boolean;
}

const ID = /^[a-z0-9][a-z0-9_-]*$/;
/** Id категорії зберігається в налаштуваннях користувачів, тож суворіше: без «-». */
const CATEGORY_ID = /^[a-z][a-z0-9_]*$/;
/** Мова, назва якою обов'язкова: на неї додаток відступає, коли немає перекладу. */
export const FALLBACK_LANGUAGE = 'en';
const TIERS: readonly string[] = ['free', 'full'] satisfies Tier[];

/** Перевіряє таблицю й повертає картки та всі знайдені помилки разом. */
export function validateSheet(sheet: Sheet, options: ValidateOptions): { cards: SourceCard[]; errors: string[] } {
  const errors: string[] = [];
  const seen = new Map<string, number>();
  const cards: SourceCard[] = [];

  for (const row of sheet.rows) {
    const at = `cards.csv:${row.line}`;
    if (!ID.test(row.id)) errors.push(`${at}: id «${row.id}» — лише малі латинські літери, цифри, «-» і «_»`);
    const first = seen.get(row.id);
    if (first !== undefined) errors.push(`${at}: id «${row.id}» уже є в рядку ${first}`);
    else seen.set(row.id, row.line);

    if (!TIERS.includes(row.tier)) errors.push(`${at}: tier «${row.tier}» — має бути free або full`);
    if (row.preview !== '' && row.preview !== 'yes') errors.push(`${at}: preview «${row.preview}» — має бути порожнім або yes`);
    if (row.preview === 'yes' && row.tier === 'free') errors.push(`${at}: preview буває лише в повних картках`);
    if (!row.category) errors.push(`${at}: порожня категорія`);
    if (row.id && !options.imageIds.has(row.id)) errors.push(`${at}: немає картинки images/${row.id}.png`);

    for (const lang of options.publishedLocales) {
      if (sheet.languages.includes(lang) && !row.words[lang]) errors.push(`${at}: порожнє слово для опублікованої мови ${lang}`);
    }

    cards.push({ id: row.id, tier: row.tier as Tier, preview: row.preview === 'yes', category: row.category, words: row.words });
  }

  for (const lang of options.publishedLocales) {
    if (!sheet.languages.includes(lang)) errors.push(`cards.csv: немає колонки опублікованої мови ${lang}`);
  }

  for (const id of options.imageIds) {
    if (!seen.has(id)) errors.push(`images/${id}.png: немає картки з таким id у cards.csv`);
  }

  const free = cards.filter((c) => c.tier === 'free').length;
  if (options.requireFreeCount && free !== FREE_CARD_COUNT) {
    errors.push(`безкоштовних карток ${free}, а має бути рівно ${FREE_CARD_COUNT}`);
  }

  if (cards.length > 0 && completeLocales(sheet.languages, cards).length === 0) {
    errors.push('немає жодної мови, у якій перекладені всі картки');
  }

  return { cards, errors };
}

/** Мови, у яких перекладені всі картки. Лише вони потрапляють у маніфест. */
export function completeLocales(languages: readonly string[], cards: readonly SourceCard[]): string[] {
  return languages.filter((lang) => cards.every((card) => card.words[lang]));
}

/**
 * Перевіряє `categories.csv` разом із картками: кожна картка в відомій категорії, кожна категорія не порожня,
 * обкладинка — картка цієї категорії, яку бачить і безкоштовний користувач (free або preview).
 */
export function validateCategories(sheet: CategorySheet, cards: readonly SourceCard[]): { categories: Category[]; errors: string[] } {
  const errors: string[] = [];
  const categories: Category[] = [];
  const seen = new Set<string>();
  const byId = new Map(cards.map((card) => [card.id, card]));

  if (!sheet.languages.includes(FALLBACK_LANGUAGE)) errors.push(`categories.csv: немає колонки ${FALLBACK_LANGUAGE}`);

  for (const row of sheet.rows) {
    const at = `categories.csv:${row.line}`;
    if (!CATEGORY_ID.test(row.id)) errors.push(`${at}: id «${row.id}» — лише малі латинські літери, цифри й «_»`);
    if (seen.has(row.id)) errors.push(`${at}: категорія «${row.id}» повторюється`);
    seen.add(row.id);
    if (!row.names[FALLBACK_LANGUAGE]) errors.push(`${at}: немає назви ${FALLBACK_LANGUAGE}`);

    const cover = byId.get(row.cover);
    if (!cover) errors.push(`${at}: обкладинка «${row.cover}» — немає такої картки`);
    else if (cover.category !== row.id) errors.push(`${at}: обкладинка «${row.cover}» з іншої категорії (${cover.category})`);
    else if (cover.tier !== 'free' && !cover.preview) errors.push(`${at}: обкладинка «${row.cover}» має бути free або preview=yes`);

    if (!cards.some((card) => card.category === row.id)) errors.push(`${at}: у категорії «${row.id}» немає карток`);
    categories.push({ id: row.id, cover: row.cover, names: row.names });
  }

  for (const card of cards) {
    if (card.category && !seen.has(card.category)) errors.push(`cards.csv: картка «${card.id}» у невідомій категорії «${card.category}»`);
  }

  return { categories, errors };
}
