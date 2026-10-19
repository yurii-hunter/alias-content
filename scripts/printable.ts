// Лише друковані картки, без картинок для додатку: щоб швидко подивитися PDF і сторінки локально.
//   node scripts/printable.ts [--out dist]
// У CI їх збирає scripts/build.ts разом з усім іншим.
import { readFile, readdir } from 'node:fs/promises';
import { parseArgs } from 'node:util';

import { parseSheet } from './lib/csv.ts';
import { writePrintables } from './lib/printable.ts';
import { completeLocales, validateSheet } from './lib/validate.ts';

const { values: args } = parseArgs({ options: { out: { type: 'string', default: 'dist' } } });

const { sheet, errors: csvErrors } = parseSheet(await readFile('cards.csv', 'utf8'));
const imageIds = new Set((await readdir('images')).filter((f) => f.endsWith('.png')).map((f) => f.slice(0, -4)));
const { cards, errors } = validateSheet(sheet, { imageIds, publishedLocales: [], requireFreeCount: true });
if (csvErrors.length + errors.length > 0) {
  console.error([...csvErrors, ...errors].map((e) => `  • ${e}`).join('\n'));
  process.exit(1);
}
const langs = await writePrintables(cards, completeLocales(sheet.languages, cards), args.out!);
console.log(`Готово: ${args.out}/printable/ (${langs.join(', ')})`);
