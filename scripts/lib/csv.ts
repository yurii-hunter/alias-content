import { parse } from 'csv-parse/sync';

import type { CategorySheet, RawCategory, RawRow, Sheet } from './types.ts';

const CARD_COLUMNS = ['id', 'tier', 'preview', 'category'];
const CATEGORY_COLUMNS = ['id', 'cover'];

interface Table {
  languages: string[];
  /** Клітинки рядка без пробілів по краях: спершу фіксовані колонки, потім слова за мовою. */
  rows: { line: number; fixed: string[]; byLanguage: Record<string, string> }[];
}

/** Таблиця «фіксовані колонки, далі по колонці на мову». Значення клітинок перевіряє валідація. */
function parseTable(file: string, text: string, fixedColumns: string[], errors: string[]): Table {
  const records: string[][] = parse(text, { bom: true, skip_empty_lines: true, relax_column_count: true });
  const [header = [], ...body] = records;
  const columns = header.map((c) => c.trim());

  fixedColumns.forEach((name, i) => {
    if (columns[i] !== name) errors.push(`${file}: колонка ${i + 1} має бути «${name}», а не «${columns[i] ?? ''}»`);
  });
  const languages = columns.slice(fixedColumns.length);
  for (const lang of languages) {
    if (!/^[a-z]{2,3}$/.test(lang)) errors.push(`${file}: «${lang}» не схоже на код мови (uk, en, de…)`);
  }
  if (new Set(languages).size !== languages.length) errors.push(`${file}: мова повторюється в заголовку`);

  const rows = body.map((record, i) => {
    const cell = (index: number) => (record[index] ?? '').trim();
    const byLanguage: Record<string, string> = {};
    languages.forEach((lang, j) => {
      const value = cell(fixedColumns.length + j);
      if (value) byLanguage[lang] = value;
    });
    return { line: i + 2, fixed: fixedColumns.map((_, k) => cell(k)), byLanguage };
  });
  return { languages, rows };
}

/** Розбирає `cards.csv`: перевіряє заголовок, значення клітинок перевіряє `validateSheet`. */
export function parseSheet(text: string): { sheet: Sheet; errors: string[] } {
  const errors: string[] = [];
  const table = parseTable('cards.csv', text, CARD_COLUMNS, errors);
  const rows = table.rows.map(({ line, fixed: [id, tier, preview, category], byLanguage }): RawRow => ({
    line,
    id,
    tier,
    preview,
    category,
    words: byLanguage,
  }));
  return { sheet: { languages: table.languages, rows }, errors };
}

/** Розбирає `categories.csv`: id, cover, далі назви мовами інтерфейсу. */
export function parseCategories(text: string): { sheet: CategorySheet; errors: string[] } {
  const errors: string[] = [];
  const table = parseTable('categories.csv', text, CATEGORY_COLUMNS, errors);
  const rows = table.rows.map(({ line, fixed: [id, cover], byLanguage }): RawCategory => ({ line, id, cover, names: byLanguage }));
  return { sheet: { languages: table.languages, rows }, errors };
}
