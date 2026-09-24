import { parse } from 'csv-parse/sync';

import type { RawRow, Sheet } from './types.ts';

const FIXED_COLUMNS = ['id', 'tier', 'preview'];

/** Розбирає `cards.csv`: перевіряє заголовок, значення клітинок перевіряє `validateSheet`. */
export function parseSheet(text: string): { sheet: Sheet; errors: string[] } {
  const records: string[][] = parse(text, { bom: true, skip_empty_lines: true, relax_column_count: true });
  const [header = [], ...body] = records;
  const columns = header.map((c) => c.trim());
  const errors: string[] = [];

  FIXED_COLUMNS.forEach((name, i) => {
    if (columns[i] !== name) errors.push(`cards.csv: колонка ${i + 1} має бути «${name}», а не «${columns[i] ?? ''}»`);
  });
  const languages = columns.slice(FIXED_COLUMNS.length);
  for (const lang of languages) {
    if (!/^[a-z]{2,3}$/.test(lang)) errors.push(`cards.csv: «${lang}» не схоже на код мови (uk, en, de…)`);
  }
  if (new Set(languages).size !== languages.length) errors.push('cards.csv: мова повторюється в заголовку');

  const rows = body.map((record, i): RawRow => {
    const cell = (index: number) => (record[index] ?? '').trim();
    const words: Record<string, string> = {};
    languages.forEach((lang, j) => {
      const word = cell(FIXED_COLUMNS.length + j);
      if (word) words[lang] = word;
    });
    return { line: i + 2, id: cell(0), tier: cell(1), preview: cell(2), words };
  });

  return { sheet: { languages, rows }, errors };
}
