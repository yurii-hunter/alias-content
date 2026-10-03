// Ріже згенеровані сітки на окремі картинки карток.
//   node scripts/split-sheets.ts generation/batch-10 [--sheet b10-05]
//
// Читає <партія>/sheets.csv (sheet,row,col,index,id), бере generation/sheets/<sheet>.png|webp|jpg,
// знаходить предмети на прозорому або білому тлі, кожен обрізає, центрує на квадраті й зберігає
// images/<id>.png (1024 px, прозоре тло). Окремо перегенерований предмет кладеться як
// generation/sheets/fix-<id>.png і має пріоритет над сіткою.
// Наприкінці пише <партія>/review.html — контрольний аркуш «картинка + слово» — і оновлює
// загальний generation/review.html з усіма словами.
import { access, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parseArgs } from 'node:util';

import { parse } from 'csv-parse/sync';
import sharp from 'sharp';

import { renderReview, readWords, writeOverallReview, IMAGES_DIR } from './lib/review.ts';
import { assignToCells, cutout, findComponents, foregroundMask, splitNecks, type Box } from './lib/sheet.ts';

const OUT_SIZE = 1024;
/** Яку частку квадрата займає більша сторона предмета. */
const FILL = 0.86;
const SHEETS_DIR = 'generation/sheets';

const { values: args, positionals } = parseArgs({
  allowPositionals: true,
  options: { sheet: { type: 'string' } },
});
const batchDir = positionals[0];
if (!batchDir) {
  console.error('Використання: node scripts/split-sheets.ts <папка партії, напр. generation/batch-10> [--sheet b10-05]');
  process.exit(2);
}

interface Slot {
  sheet: string;
  row: number;
  col: number;
  index: number;
  id: string;
}

interface Result {
  id: string;
  sheet: string;
  source: string;
  problems: string[];
  written: boolean;
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function findImage(name: string): Promise<string | null> {
  for (const ext of ['png', 'webp', 'jpg', 'jpeg']) {
    const path = join(SHEETS_DIR, `${name}.${ext}`);
    if (await exists(path)) return path;
  }
  return null;
}

async function loadRaw(path: string) {
  const { data, info } = await sharp(path).raw().toBuffer({ resolveWithObject: true });
  return { data: new Uint8Array(data.buffer, data.byteOffset, data.length), width: info.width, height: info.height, channels: info.channels };
}

type Raw = Awaited<ReturnType<typeof loadRaw>>;

/** Вирізає предмет, центрує на прозорому квадраті OUT_SIZE і зберігає PNG. Повертає більшу сторону предмета в джерелі. */
async function writeCard(raw: Raw, labels: Int32Array, box: Box, ids: number[], id: string) {
  const cut = cutout(raw.data, raw.width, raw.channels, labels, box, ids);
  const target = Math.round(OUT_SIZE * FILL);
  const scale = target / Math.max(cut.width, cut.height);
  const item = await sharp(cut.data, { raw: { width: cut.width, height: cut.height, channels: 4 } })
    .resize(Math.round(cut.width * scale), Math.round(cut.height * scale), { kernel: 'lanczos3' })
    .png()
    .toBuffer({ resolveWithObject: true });
  await sharp({ create: { width: OUT_SIZE, height: OUT_SIZE, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: item.data, left: Math.round((OUT_SIZE - item.info.width) / 2), top: Math.round((OUT_SIZE - item.info.height) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(join(IMAGES_DIR, `${id}.png`));
  return Math.max(cut.width, cut.height);
}

/** Знаходить предмети на картинці й розкладає по клітинках сітки. */
function analyze(raw: Raw, cols: number, rows: number) {
  const found = findComponents(foregroundMask(raw.data, raw.width, raw.height, raw.channels), raw.width, raw.height);
  const { labels } = found;
  // Предмети, що торкнулися сусідів через межу клітинки, розрізаємо по найвужчому місцю.
  const components = splitNecks(found.components, labels, raw.width, raw.height, cols, rows);
  return { cells: assignToCells(components, raw.width, raw.height, cols, rows), labels };
}

async function main() {
  const slots: Slot[] = parse(await readFile(join(batchDir, 'sheets.csv'), 'utf8'), { columns: true, skip_empty_lines: true, bom: true }).map(
    (r: Record<string, string>) => ({ sheet: r.sheet, row: Number(r.row), col: Number(r.col), index: Number(r.index), id: r.id }),
  );
  const words = await readWords();
  await mkdir(IMAGES_DIR, { recursive: true });

  const bySheet = new Map<string, Slot[]>();
  for (const slot of slots) {
    if (args.sheet && slot.sheet !== args.sheet) continue;
    bySheet.set(slot.sheet, [...(bySheet.get(slot.sheet) ?? []), slot]);
  }

  const results: Result[] = [];
  for (const [sheet, sheetSlots] of bySheet) {
    const cols = Math.max(...sheetSlots.map((s) => s.col));
    const rows = Math.max(...sheetSlots.map((s) => s.row));
    const path = await findImage(sheet);
    const raw = path ? await loadRaw(path) : null;
    const found = raw ? analyze(raw, cols, rows) : null;

    for (const slot of sheetSlots) {
      const result: Result = { id: slot.id, sheet, source: path ?? '', problems: [], written: false };
      results.push(result);

      // Окремо перегенерований предмет важливіший за сітку.
      const fix = await findImage(`fix-${slot.id}`);
      if (fix) {
        const fixRaw = await loadRaw(fix);
        const single = analyze(fixRaw, 1, 1);
        const all = single.cells[0];
        result.source = fix;
        if (!all.box) result.problems.push(`${fix}: предмет не знайдено`);
        else {
          const side = await writeCard(fixRaw, single.labels, all.box, all.ids, slot.id);
          result.written = true;
          if (side < 350) result.problems.push(`малий розмір у джерелі (${side} px) — картинка буде розмитою`);
        }
        continue;
      }

      if (!raw || !found) {
        result.problems.push(`немає файлу ${SHEETS_DIR}/${sheet}.png`);
        continue;
      }
      const cell = found.cells[(slot.row - 1) * cols + (slot.col - 1)];
      result.problems.push(...cell.problems);
      if (cell.box) {
        const side = await writeCard(raw, found.labels, cell.box, cell.ids, slot.id);
        result.written = true;
        if (side < 350) result.problems.push(`малий розмір у джерелі (${side} px) — картинка буде розмитою`);
      }
    }
  }

  await writeReview(results, words);
  const overall = await writeOverallReview();

  const written = results.filter((r) => r.written).length;
  const flagged = results.filter((r) => r.problems.length);
  console.log(`Збережено ${written} з ${results.length} картинок у ${IMAGES_DIR}/.`);
  for (const r of flagged) console.log(`  ! ${r.id} (${r.sheet}): ${r.problems.join('; ')}`);
  console.log(`Контрольний аркуш: ${join(batchDir, 'review.html')}`);
  console.log(`Загальний аркуш: ${overall}`);
}

async function writeReview(results: Result[], words: Record<string, Record<string, string>>) {
  const imgRel = relative(batchDir, IMAGES_DIR);
  const stamp = Date.now();
  const tiles = results.map((r) => ({
    id: r.id,
    note: r.sheet,
    uk: words[r.id]?.uk ?? '',
    en: words[r.id]?.en ?? '',
    image: r.written ? `${imgRel}/${r.id}.png?${stamp}` : null,
    problems: r.problems,
  }));
  const html = renderReview({
    title: `Перевірка картинок: ${batchDir}`,
    intro: `${results.length} карток. Червона рамка — скрипт знайшов проблему. Решту перевірте очима: чи впізнається предмет і чи відповідає слову.`,
    tiles,
  });
  await writeFile(join(batchDir, 'review.html'), html);
}

await main();
