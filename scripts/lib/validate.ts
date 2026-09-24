import type { Sheet, SourceCard, Tier } from './types.ts';

export const FREE_CARD_COUNT = 100;

export interface ValidateOptions {
  /** Id, для яких є `images/<id>.png`. */
  imageIds: ReadonlySet<string>;
  /** Мови, які вже є в опублікованому маніфесті. */
  publishedLocales: readonly string[];
  /** Вимагати рівно `FREE_CARD_COUNT` безкоштовних карток. */
  requireFreeCount: boolean;
}

const ID = /^[a-z0-9][a-z0-9_-]*$/;
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
    if (row.id && !options.imageIds.has(row.id)) errors.push(`${at}: немає картинки images/${row.id}.png`);

    for (const lang of options.publishedLocales) {
      if (sheet.languages.includes(lang) && !row.words[lang]) errors.push(`${at}: порожнє слово для опублікованої мови ${lang}`);
    }

    cards.push({ id: row.id, tier: row.tier as Tier, preview: row.preview === 'yes', words: row.words });
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
