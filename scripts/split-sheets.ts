// Ріже згенеровані сітки на окремі картинки карток.
//   node scripts/split-sheets.ts generation/free-100 [--sheet sheet-05]
//
// Читає <партія>/sheets.csv (sheet,row,col,index,id), бере generation/sheets/<sheet>.png|webp|jpg,
// знаходить предмети на прозорому або білому тлі, кожен обрізає, центрує на квадраті й зберігає
// images/<id>.png (1024 px, прозоре тло). Окремо перегенерований предмет кладеться як
// generation/sheets/fix-<id>.png і має пріоритет над сіткою.
// Наприкінці пише <партія>/review.html — контрольний аркуш «картинка + слово».
import { access, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parseArgs } from 'node:util';

import { parse } from 'csv-parse/sync';
import sharp from 'sharp';

import { assignToCells, cutout, findComponents, foregroundMask, type Box } from './lib/sheet.ts';

const OUT_SIZE = 1024;
/** Яку частку квадрата займає більша сторона предмета. */
const FILL = 0.86;
const SHEETS_DIR = 'generation/sheets';
const IMAGES_DIR = 'images';

const { values: args, positionals } = parseArgs({
  allowPositionals: true,
  options: { sheet: { type: 'string' } },
});
const batchDir = positionals[0];
if (!batchDir) {
  console.error('Використання: node scripts/split-sheets.ts <папка партії, напр. generation/free-100> [--sheet sheet-05]');
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
  const { components, labels } = findComponents(foregroundMask(raw.data, raw.width, raw.height, raw.channels), raw.width, raw.height);
  return { cells: assignToCells(components, raw.width, raw.height, cols, rows), labels };
}

async function main() {
  const slots: Slot[] = parse(await readFile(join(batchDir, 'sheets.csv'), 'utf8'), { columns: true, skip_empty_lines: true, bom: true }).map(
    (r: Record<string, string>) => ({ sheet: r.sheet, row: Number(r.row), col: Number(r.col), index: Number(r.index), id: r.id }),
  );
  const words: Record<string, Record<string, string>> = Object.fromEntries(
    parse(await readFile('words.csv', 'utf8'), { columns: true, skip_empty_lines: true, bom: true }).map((r: Record<string, string>) => [r.id, r]),
  );
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

  const written = results.filter((r) => r.written).length;
  const flagged = results.filter((r) => r.problems.length);
  console.log(`Збережено ${written} з ${results.length} картинок у ${IMAGES_DIR}/.`);
  for (const r of flagged) console.log(`  ! ${r.id} (${r.sheet}): ${r.problems.join('; ')}`);
  console.log(`Контрольний аркуш: ${join(batchDir, 'review.html')}`);
}

function escape(text: string): string {
  return text.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]!);
}

async function writeReview(results: Result[], words: Record<string, Record<string, string>>) {
  const imgRel = relative(batchDir, IMAGES_DIR);
  const stamp = Date.now();
  const tiles = results
    .map((r) => {
      const w = words[r.id] ?? {};
      const img = r.written ? `<img src="${imgRel}/${r.id}.png?${stamp}" alt="">` : '<div class="missing">немає</div>';
      const problems = r.problems.map((p) => `<li>${escape(p)}</li>`).join('');
      return `<figure class="${r.problems.length ? 'flag' : ''}">${img}<figcaption><b>${escape(w.uk ?? r.id)}</b><span>${escape(w.en ?? '')} · ${escape(r.id)} · ${escape(r.sheet)}</span>${problems ? `<ul>${problems}</ul>` : ''}</figcaption></figure>`;
    })
    .join('\n');
  const html = `<!doctype html>
<html lang="uk"><head><meta charset="utf-8"><title>Перевірка картинок · ${escape(batchDir)}</title>
<style>
body{margin:0;padding:24px;font-family:system-ui,sans-serif;background:#FFF8EC;color:#1E1B2E}
h1{font-size:20px;margin:0 0 4px}p{margin:0 0 20px;color:#5E5A6B}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px}
figure{margin:0;background:#fff;border:2px solid #EADFCB;border-radius:20px;padding:12px;display:flex;flex-direction:column;align-items:center}
figure.flag{border-color:#D13B2F}
img{width:150px;height:150px;object-fit:contain}
.missing{width:150px;height:150px;display:flex;align-items:center;justify-content:center;color:#D13B2F}
figcaption{text-align:center;margin-top:8px}b{display:block;font-size:18px}span{font-size:12px;color:#5E5A6B}
ul{margin:6px 0 0;padding:0;list-style:none;color:#D13B2F;font-size:12px}
</style></head><body>
<h1>Перевірка картинок: ${escape(batchDir)}</h1>
<p>${results.length} карток. Червона рамка — скрипт знайшов проблему. Решту перевірте очима: чи впізнається предмет і чи відповідає слову.</p>
<main>
${tiles}
</main></body></html>
`;
  await writeFile(join(batchDir, 'review.html'), html);
}

await main();
