// Контрольні аркуші «картинка + слово»: окремий для партії й загальний для всіх партій.
import { access, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

import { parse } from 'csv-parse/sync';

export const GENERATION_DIR = 'generation';
export const IMAGES_DIR = 'images';

export interface Tile {
  id: string;
  sheet: string;
  uk: string;
  en: string;
  /** Шлях до картинки відносно аркуша; null — картинки немає. */
  image: string | null;
  problems: string[];
}

export function escape(text: string): string {
  return text.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]!);
}

function renderTile(t: Tile): string {
  const img = t.image ? `<img src="${escape(t.image)}" alt="" loading="lazy">` : '<div class="missing">немає</div>';
  const problems = t.problems.map((p) => `<li>${escape(p)}</li>`).join('');
  return `<figure class="${t.problems.length ? 'flag' : ''}">${img}<figcaption><b>${escape(t.uk || t.id)}</b><span>${escape(t.en)} · ${escape(t.id)} · ${escape(t.sheet)}</span>${problems ? `<ul>${problems}</ul>` : ''}</figcaption></figure>`;
}

export function renderReview({ title, intro, tiles }: { title: string; intro: string; tiles: Tile[] }): string {
  return `<!doctype html>
<html lang="uk"><head><meta charset="utf-8"><title>${escape(title)}</title>
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
<h1>${escape(title)}</h1>
<p>${escape(intro)}</p>
<main>
${tiles.map(renderTile).join('\n')}
</main></body></html>
`;
}

function readCsv(text: string): Record<string, string>[] {
  return parse(text, { columns: true, skip_empty_lines: true, bom: true });
}

export async function readWords(): Promise<Record<string, Record<string, string>>> {
  return Object.fromEntries(readCsv(await readFile('words.csv', 'utf8')).map((r) => [r.id, r]));
}

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/** Пише generation/review.html з усіма картками всіх партій. Повертає шлях до аркуша. */
export async function writeOverallReview(): Promise<string> {
  const out = join(GENERATION_DIR, 'review.html');
  const imgRel = relative(GENERATION_DIR, IMAGES_DIR);
  const stamp = Date.now();
  const words = await readWords();
  const batches = (await readdir(GENERATION_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory() && /^batch-\d+$/.test(d.name))
    .map((d) => d.name)
    .sort();

  const tiles: Tile[] = [];
  for (const batch of batches) {
    for (const slot of readCsv(await readFile(join(GENERATION_DIR, batch, 'sheets.csv'), 'utf8'))) {
      const w = words[slot.id] ?? {};
      const has = await exists(join(IMAGES_DIR, `${slot.id}.png`));
      tiles.push({
        id: slot.id,
        sheet: slot.sheet,
        uk: w.uk ?? '',
        en: w.en ?? '',
        image: has ? `${imgRel}/${slot.id}.png?${stamp}` : null,
        problems: [...(has ? [] : ['немає картинки']), ...(w.id ? [] : ['немає в words.csv'])],
      });
    }
  }
  const missing = tiles.filter((t) => !t.image).length;

  const html = renderReview({
    title: 'Перевірка картинок: усі картки',
    intro: `Карток: ${tiles.length}, без картинки: ${missing}. Детальні проблеми нарізки — у review.html кожної партії.`,
    tiles,
  });
  await writeFile(out, html);
  return out;
}
