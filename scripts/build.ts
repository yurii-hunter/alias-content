// Збирає cards.csv + images/*.png у статичні файли для CDN (dist/) і додає сторінки privacy/ та support/.
//   node scripts/build.ts [--published <url маніфесту>] [--allow-partial-free] [--out dist]
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

import sharp from 'sharp';

import { parseSheet } from './lib/csv.ts';
import { buildCardsFile, buildManifest, contentHash, contentVersion, imagePath } from './lib/output.ts';
import type { Manifest } from './lib/types.ts';
import { completeLocales, validateSheet } from './lib/validate.ts';

const IMAGE_SIZE = 512;
const WEBP_QUALITY = 80;

const { values: args } = parseArgs({
  options: {
    published: { type: 'string' },
    'allow-partial-free': { type: 'boolean', default: false },
    out: { type: 'string', default: 'dist' },
  },
});

/** Мови вже опублікованого маніфесту. 404 — ще нічого не опубліковано. */
async function publishedLocales(url: string | undefined): Promise<string[]> {
  if (!url) return [];
  const response = await fetch(url, { cache: 'no-store' });
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  const manifest = (await response.json()) as Manifest;
  return manifest.locales;
}

async function main() {
  const published = await publishedLocales(args.published);
  console.log(`Опубліковані мови: ${published.join(', ') || '—'}`);

  const { sheet, errors: csvErrors } = parseSheet(await readFile('cards.csv', 'utf8'));
  const pngs = (await readdir('images')).filter((f) => f.endsWith('.png'));
  const imageIds = new Set(pngs.map((f) => f.slice(0, -'.png'.length)));
  const { cards, errors } = validateSheet(sheet, {
    imageIds,
    publishedLocales: published,
    requireFreeCount: !args['allow-partial-free'],
  });
  const allErrors = [...csvErrors, ...errors];
  if (allErrors.length > 0) {
    console.error(`Помилки (${allErrors.length}):\n${allErrors.map((e) => `  • ${e}`).join('\n')}`);
    process.exit(1);
  }

  const locales = completeLocales(sheet.languages, cards);
  const incomplete = sheet.languages.filter((lang) => !locales.includes(lang));
  if (incomplete.length > 0) console.log(`Не опубліковано (є порожні слова): ${incomplete.join(', ')}`);

  const out = args.out!;
  await rm(out, { recursive: true, force: true });
  await mkdir(join(out, 'img'), { recursive: true });

  const images = new Map<string, string>();
  for (const card of cards) {
    const webp = await sharp(join('images', `${card.id}.png`))
      .resize(IMAGE_SIZE, IMAGE_SIZE, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toBuffer();
    const path = imagePath(card.id, webp);
    await writeFile(join(out, path), webp);
    images.set(card.id, path);
  }

  const cardsJson = JSON.stringify(buildCardsFile(cards, locales, images));
  const cardsName = `cards.${contentHash(cardsJson)}.json`;
  await writeFile(join(out, cardsName), cardsJson);

  const version = contentVersion(new Date(), process.env.GITHUB_RUN_NUMBER ?? 'local');
  const manifest = buildManifest(locales, cardsName, version);
  await writeFile(join(out, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  // Політика конфіденційності й підтримка: посилання на них вказані в App Store і Google Play.
  await cp('privacy', join(out, 'privacy'), { recursive: true });
  await cp('support', join(out, 'support'), { recursive: true });
  // GitHub Pages не обробляє файли через Jekyll.
  await writeFile(join(out, '.nojekyll'), '');

  const free = cards.filter((c) => c.tier === 'free').length;
  console.log(`Готово: ${cards.length} карток (${free} безкоштовних), мови ${locales.join(', ')}, ${version}`);
}

await main();
