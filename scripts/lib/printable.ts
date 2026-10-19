// Друковані картки: PDF з 30 безкоштовними картками і сторінка для кожної мови.
// Вимоги — docs/requirements.md («Друковані картки»), розмітка — docs/design/printable.md у репозиторії додатку.
// Розміри нижче — у пікселях макета A4 794×1123 (96 px/дюйм); у PDF вони множаться на 0,75.
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import fontkit from '@pdf-lib/fontkit';
import { parse } from 'csv-parse/sync';
import { PDFDict, PDFDocument, PDFName, PDFString, degrees, rgb } from 'pdf-lib';
import type { PDFFont, PDFImage, PDFPage, RGB } from 'pdf-lib';
import QRCode from 'qrcode';
import sharp from 'sharp';

import type { SourceCard } from './types.ts';

export const SITE = 'https://yurii-hunter.github.io/alias-content/';
const APP_ID = '6816392085';
/** App Store Connect → Analytics → Campaigns. Порожній — посилання працює, але кампанія не рахується. */
const PROVIDER_TOKEN = '129516479';

export const STRING_KEYS = [
  'languageName', 'pageTitle', 'subtitle', 'pageDescription', 'download', 'fileInfo', 'previewCaption', 'howTo',
  'rule1', 'rule2', 'rule3', 'rule4', 'rule5', 'rule6',
  'cutHint', 'timerHint', 'ctaTitle', 'ctaText', 'scanHint', 'appStore', 'support', 'privacy',
] as const;
export type StringKey = (typeof STRING_KEYS)[number];
export type Strings = Record<StringKey, string>;

export const CARDS_PER_PAGE = 6;

const PX = 0.75;
const PAGE_W = 794;
const PAGE_H = 1123;

const hex = (h: string): RGB => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const C = {
  red: hex('#D13B2F'),
  blue: hex('#2563D6'),
  ink: hex('#1E1B2E'),
  inkMuted: hex('#5E5A6B'),
  line: hex('#EADFCB'),
  cut: hex('#9A94A6'),
  redTint: hex('#FCE7E4'),
  blueTint: hex('#E3ECFC'),
  white: rgb(1, 1, 1),
};

/** `printable/strings.csv`: key, далі колонка на мову. Повертає лише мови, у яких заповнені всі ключі. */
export function parseStrings(text: string): { strings: Record<string, Strings>; incomplete: string[] } {
  const [header = [], ...rows]: string[][] = parse(text, { bom: true, skip_empty_lines: true, relax_column_count: true });
  const languages = header.slice(1).map((l) => l.trim());
  const byKey = new Map(rows.map((r) => [r[0]?.trim(), r.slice(1)]));
  const strings: Record<string, Strings> = {};
  const incomplete: string[] = [];
  languages.forEach((lang, i) => {
    const entry: Partial<Strings> = {};
    for (const key of STRING_KEYS) {
      const value = byKey.get(key)?.[i]?.trim();
      if (value) entry[key] = value;
    }
    if (STRING_KEYS.every((k) => entry[k])) strings[lang] = entry as Strings;
    else incomplete.push(lang);
  });
  return { strings, incomplete };
}

export function appStoreUrl(lang: string): string {
  const pt = PROVIDER_TOKEN ? `pt=${PROVIDER_TOKEN}&` : '';
  return `https://apps.apple.com/app/apple-store/id${APP_ID}?${pt}ct=printable-${lang}&mt=8`;
}

export const pdfName = (lang: string) => `fox-bunny-cards-${lang}.pdf`;

/** Безкоштовні картки в порядку таблиці, по 6 на сторінку. */
export function cardPages(cards: readonly SourceCard[]): SourceCard[][] {
  const free = cards.filter((c) => c.tier === 'free');
  const pages: SourceCard[][] = [];
  for (let i = 0; i < free.length; i += CARDS_PER_PAGE) pages.push(free.slice(i, i + CARDS_PER_PAGE));
  return pages;
}

/** Як `wrap`, але рядки заголовка вирівнюються за довжиною, без одного слова в останньому рядку. */
export function balance(text: string, width: (s: string) => number, maxWidth: number): string[] {
  const lines = wrap(text, width, maxWidth);
  if (lines.length < 2) return lines;
  const lo = maxWidth / lines.length;
  let best = lines;
  for (let w = lo; w <= maxWidth; w += 4) {
    const candidate = wrap(text, width, w);
    if (candidate.length === lines.length && candidate.every((l) => width(l) <= w)) {
      best = candidate;
      break;
    }
  }
  return best;
}

/** Розбиває текст на рядки не ширші за `maxWidth` (px). */
export function wrap(text: string, width: (s: string) => number, maxWidth: number): string[] {
  const lines: string[] = [];
  let current = '';
  for (const word of text.split(/ +/)) {
    const next = current ? `${current} ${word}` : word;
    if (current && width(next) > maxWidth) {
      lines.push(current);
      current = word;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines;
}

// ---------- Маскоти (ті самі SVG, що в макетах) ----------

const FOX = `<path d="M20 52 L30 10 L56 38 Z" fill="#E8572A" stroke="#1E1B2E" stroke-width="4" stroke-linejoin="round"/><path d="M100 52 L90 10 L64 38 Z" fill="#E8572A" stroke="#1E1B2E" stroke-width="4" stroke-linejoin="round"/><path d="M30 40 L33 24 L44 36 Z" fill="#FFD9C7"/><path d="M90 40 L87 24 L76 36 Z" fill="#FFD9C7"/><path d="M16 54 Q60 22 104 54 Q102 94 60 110 Q18 94 16 54 Z" fill="#F0662F" stroke="#1E1B2E" stroke-width="4" stroke-linejoin="round"/><path d="M22 62 Q42 70 60 108 Q28 96 22 62 Z" fill="#FFF4EA"/><path d="M98 62 Q78 70 60 108 Q92 96 98 62 Z" fill="#FFF4EA"/><circle cx="44" cy="64" r="6" fill="#1E1B2E"/><circle cx="76" cy="64" r="6" fill="#1E1B2E"/><circle cx="46" cy="62" r="2" fill="#fff"/><circle cx="78" cy="62" r="2" fill="#fff"/><circle cx="34" cy="78" r="5" fill="#FF9C8A" opacity=".8"/><circle cx="86" cy="78" r="5" fill="#FF9C8A" opacity=".8"/><ellipse cx="60" cy="90" rx="6" ry="4.5" fill="#1E1B2E"/><path d="M53 97 Q60 103 67 97" fill="none" stroke="#1E1B2E" stroke-width="3.5" stroke-linecap="round"/>`;
const BUNNY = `<g transform="rotate(-10 44 34)"><ellipse cx="44" cy="34" rx="12" ry="30" fill="#EEF3FF" stroke="#1E1B2E" stroke-width="4"/><ellipse cx="44" cy="36" rx="5.5" ry="20" fill="#FFC6D3"/></g><g transform="rotate(10 76 34)"><ellipse cx="76" cy="34" rx="12" ry="30" fill="#EEF3FF" stroke="#1E1B2E" stroke-width="4"/><ellipse cx="76" cy="36" rx="5.5" ry="20" fill="#FFC6D3"/></g><ellipse cx="60" cy="80" rx="40" ry="32" fill="#EEF3FF" stroke="#1E1B2E" stroke-width="4"/><circle cx="46" cy="76" r="6" fill="#1E1B2E"/><circle cx="74" cy="76" r="6" fill="#1E1B2E"/><circle cx="48" cy="74" r="2" fill="#fff"/><circle cx="76" cy="74" r="2" fill="#fff"/><circle cx="36" cy="88" r="5" fill="#FFB3C4" opacity=".9"/><circle cx="84" cy="88" r="5" fill="#FFB3C4" opacity=".9"/><ellipse cx="60" cy="88" rx="5" ry="3.5" fill="#F27A98" stroke="#1E1B2E" stroke-width="2"/><path d="M60 92 Q57 98 52 96" fill="none" stroke="#1E1B2E" stroke-width="3" stroke-linecap="round"/><path d="M60 92 Q63 98 68 96" fill="none" stroke="#1E1B2E" stroke-width="3" stroke-linecap="round"/>`;
const svgPng = (body: string, size: number) =>
  sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}">${body}</svg>`)).png().toBuffer();

// Лінійні іконки 24×24, штрих 2,6, як у додатку.
const CLOCK = 'M20 13 A8 8 0 1 1 4 13 A8 8 0 1 1 20 13 Z M12 9 V13 L14.5 15 M10 2 H14 M12 2 V5';
const SCISSORS = 'M9 6 A3 3 0 1 1 3 6 A3 3 0 1 1 9 6 Z M9 18 A3 3 0 1 1 3 18 A3 3 0 1 1 9 18 Z M20 4 L8.1 15.9 M14.5 14.5 L20 20 M8.1 8.1 L12 12';

const roundRect = (w: number, h: number, r: number) =>
  `M${r} 0 H${w - r} A${r} ${r} 0 0 1 ${w} ${r} V${h - r} A${r} ${r} 0 0 1 ${w - r} ${h} H${r} A${r} ${r} 0 0 1 0 ${h - r} V${r} A${r} ${r} 0 0 1 ${r} 0 Z`;

// ---------- Малювання в координатах макета (px, вісь y вниз) ----------

interface Fonts {
  rubik700: PDFFont;
  rubik800: PDFFont;
  nunito700: PDFFont;
}

class Sheet {
  readonly page: PDFPage;
  constructor(page: PDFPage) {
    this.page = page;
  }
  /** Текст: `top` — верх рядка, базова лінія на 0,8 розміру нижче. */
  text(s: string, x: number, top: number, font: PDFFont, size: number, color: RGB) {
    this.page.drawText(s, { x: x * PX, y: (PAGE_H - top - size * 0.8) * PX, size: size * PX, font, color });
  }
  center(s: string, cx: number, top: number, font: PDFFont, size: number, color: RGB) {
    this.text(s, cx - font.widthOfTextAtSize(s, size) / 2, top, font, size, color);
  }
  right(s: string, rx: number, top: number, font: PDFFont, size: number, color: RGB) {
    this.text(s, rx - font.widthOfTextAtSize(s, size), top, font, size, color);
  }
  image(img: PDFImage, x: number, top: number, w: number, h: number) {
    this.page.drawImage(img, { x: x * PX, y: (PAGE_H - top - h) * PX, width: w * PX, height: h * PX });
  }
  path(d: string, x: number, top: number, opts: { fill?: RGB; stroke?: RGB; strokeWidth?: number; scale?: number; rotate?: number }) {
    const scale = opts.scale ?? 1;
    this.page.drawSvgPath(d, {
      x: x * PX,
      y: (PAGE_H - top) * PX,
      scale: scale * PX,
      color: opts.fill,
      borderColor: opts.stroke,
      borderWidth: opts.stroke ? (opts.strokeWidth ?? 1) / scale : undefined,
      borderLineCap: 1,
      rotate: opts.rotate ? degrees(-opts.rotate) : undefined,
    });
  }
  circle(cx: number, cy: number, r: number, fill: RGB, stroke?: RGB, strokeWidth = 0) {
    this.page.drawCircle({ x: cx * PX, y: (PAGE_H - cy) * PX, size: r * PX, color: fill, borderColor: stroke, borderWidth: strokeWidth * PX });
  }
  dashed(x1: number, y1: number, x2: number, y2: number) {
    this.page.drawLine({
      start: { x: x1 * PX, y: (PAGE_H - y1) * PX },
      end: { x: x2 * PX, y: (PAGE_H - y2) * PX },
      thickness: 0.75,
      color: C.cut,
      dashArray: [8.5, 5.7], // 3 мм штрих, 2 мм проміжок
    });
  }
  footer(fonts: Fonts, n: number, inset: number) {
    this.text('Fox & Bunny', inset, PAGE_H - 34, fonts.rubik800, 11, C.inkMuted);
    this.right(String(n), PAGE_W - inset, PAGE_H - 34, fonts.rubik800, 11, C.inkMuted);
  }
}

/** Слово на картці: 29 px, зменшується до 18,7 px (14 pt), далі — два рядки. */
function fitWord(word: string, font: PDFFont, maxWidth: number): { size: number; lines: string[] } {
  for (let size = 29; size >= 18.7; size -= 0.5) {
    if (font.widthOfTextAtSize(word, size) <= maxWidth) return { size, lines: [word] };
  }
  const lines = wrap(word, (s) => font.widthOfTextAtSize(s, 18.7), maxWidth);
  return { size: 18.7, lines };
}

async function cardImage(doc: PDFDocument, id: string): Promise<PDFImage> {
  const jpg = await sharp(join('images', `${id}.png`))
    .flatten({ background: '#ffffff' })
    .resize(900, 900, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
  return doc.embedJpg(jpg);
}

async function loadFonts(doc: PDFDocument): Promise<Fonts> {
  doc.registerFontkit(fontkit);
  const embed = async (file: string) => doc.embedFont(await readFile(join('fonts', file)), { subset: true });
  return {
    rubik700: await embed('Rubik_700Bold.ttf'),
    rubik800: await embed('Rubik_800ExtraBold.ttf'),
    nunito700: await embed('Nunito_700Bold.ttf'),
  };
}

function drawCover(sheet: Sheet, t: Strings, f: Fonts, fox: PDFImage, bunny: PDFImage) {
  const cx = PAGE_W / 2;
  sheet.circle(cx - 61, 134, 68.5, C.redTint, C.ink, 3);
  sheet.circle(cx + 61, 134, 68.5, C.blueTint, C.ink, 3);
  sheet.image(fox, cx - 61 - 52, 82, 104, 104);
  sheet.image(bunny, cx + 61 - 52, 82, 104, 104);

  let y = 226;
  sheet.center('Fox & Bunny', cx, y, f.rubik800, 53, C.ink);
  y += 53 + 18;
  for (const line of balance(t.pageTitle, (s) => f.rubik700.widthOfTextAtSize(s, 32), 650)) {
    sheet.center(line, cx, y, f.rubik700, 32, C.ink);
    y += 38;
  }
  y += 10;
  sheet.center(t.subtitle, cx, y, f.nunito700, 16, C.inkMuted);
  y += 16 + 44;

  const rules = [t.rule1, t.rule2, t.rule3, t.rule4, t.rule5, t.rule6];
  rules.forEach((rule, i) => {
    sheet.circle(72 + 14, y + 14, 14, i % 2 === 0 ? C.red : C.blue);
    sheet.center(String(i + 1), 72 + 14, y + 7, f.rubik800, 16, C.white);
    const lines = wrap(rule, (s) => f.nunito700.widthOfTextAtSize(s, 17), 650 - 42);
    lines.forEach((line, j) => sheet.text(line, 72 + 42, y + 4 + j * 24, f.nunito700, 17, C.ink));
    y += Math.max(28, lines.length * 24) + 16;
  });

  const boxTop = PAGE_H - 72 - 86;
  sheet.path(roundRect(650, 86, 23), 72, boxTop, { stroke: C.line, strokeWidth: 3 });
  sheet.path(CLOCK, 72 + 24, boxTop + 23, { stroke: C.ink, strokeWidth: 2.6, scale: 40 / 24 });
  sheet.text(t.timerHint, 72 + 24 + 40 + 16, boxTop + 31, f.rubik700, 24, C.ink);
  sheet.footer(f, 1, 72);
}

function drawCards(sheet: Sheet, t: Strings, f: Fonts, cards: { word: string; image: PDFImage }[], n: number) {
  const left = 57;
  const top = 51;
  const size = 340;
  cards.forEach(({ word, image }, i) => {
    const x = left + (i % 2) * size;
    const y = top + Math.floor(i / 2) * size;
    sheet.image(image, x + 45, y + 23, 250, 250);
    const { size: fontSize, lines } = fitWord(word, f.rubik700, size - 32);
    lines.forEach((line, j) => sheet.center(line, x + size / 2, y + 287 + j * fontSize * 1.1 - (lines.length - 1) * 6, f.rubik700, fontSize, C.ink));
  });
  for (const x of [left, left + size, left + 2 * size]) sheet.dashed(x, 0, x, PAGE_H);
  for (let r = 0; r <= 3; r++) sheet.dashed(0, top + r * size, PAGE_W, top + r * size);
  sheet.page.drawRectangle({ x: 66 * PX, y: (PAGE_H - 36) * PX, width: (f.nunito700.widthOfTextAtSize(t.cutHint, 11) + 34) * PX, height: 20 * PX, color: C.white });
  sheet.path(SCISSORS, 72, 18, { stroke: C.inkMuted, strokeWidth: 2.6, scale: 16 / 24 });
  sheet.text(t.cutHint, 94, 21, f.nunito700, 11, C.inkMuted);
  sheet.footer(f, n, 66); // не на лінії розрізу
}

async function drawBack(doc: PDFDocument, sheet: Sheet, t: Strings, f: Fonts, lang: string, fan: { word: string; image: PDFImage }[], fox: PDFImage, bunny: PDFImage) {
  const cx = PAGE_W / 2;
  // Віяло з трьох карток: −8°, 0°, 8° навколо центру; середня зверху.
  const angles = [-8, 0, 8];
  for (const i of [0, 2, 1]) {
    const card = fan[i];
    if (!card) continue;
    const a = (angles[i] * Math.PI) / 180;
    const ccx = 159 + i * 150 + 88;
    const ccy = 120 + (i === 1 ? 0 : 18) + 88;
    const at = (dx: number, dy: number) => ({ x: ccx + dx * Math.cos(a) - dy * Math.sin(a), y: ccy + dx * Math.sin(a) + dy * Math.cos(a) });
    const tl = at(-88, -88);
    sheet.path(roundRect(176, 176, 20), tl.x, tl.y, { fill: C.white, stroke: C.line, strokeWidth: 3, rotate: angles[i] });
    const bl = at(-59, -70 + 118);
    sheet.page.drawImage(card.image, { x: bl.x * PX, y: (PAGE_H - bl.y) * PX, width: 118 * PX, height: 118 * PX, rotate: degrees(-angles[i]) });
    const w = f.rubik700.widthOfTextAtSize(card.word, 18);
    const base = at(-w / 2, 70);
    sheet.page.drawText(card.word, { x: base.x * PX, y: (PAGE_H - base.y) * PX, size: 18 * PX, font: f.rubik700, color: C.ink, rotate: degrees(-angles[i]) });
  }

  let y = 120 + 18 + 176 + 64;
  for (const line of balance(t.ctaTitle, (s) => f.rubik700.widthOfTextAtSize(s, 35), 650)) {
    sheet.center(line, cx, y, f.rubik700, 35, C.ink);
    y += 42;
  }
  y += 14;
  for (const line of wrap(t.ctaText, (s) => f.nunito700.widthOfTextAtSize(s, 17), 520)) {
    sheet.center(line, cx, y, f.nunito700, 17, C.inkMuted);
    y += 25.5;
  }
  y += 56;

  // QR з полем у 4 модулі; праворуч — підказка, значок App Store і текст посилання.
  const url = appStoreUrl(lang);
  // QR — картинкою без згладжування: окремі квадрати модулів дають на екрані світлі шви.
  const qr = await doc.embedPng(await QRCode.toBuffer(url, { errorCorrectionLevel: 'M', margin: 4, scale: 16, color: { dark: '#1E1B2EFF', light: '#FFFFFFFF' } }));
  const box = 184;
  const left = cx - (box + 36 + 240) / 2;
  sheet.path(roundRect(box, box, 12), left, y, { fill: C.white, stroke: C.line, strokeWidth: 3 });
  sheet.image(qr, left + 6, y + 6, box - 12, box - 12);

  const colX = left + box + 36;
  let ty = y + 8;
  for (const line of wrap(t.scanHint, (s) => f.rubik700.widthOfTextAtSize(s, 22), 240)) {
    sheet.text(line, colX, ty, f.rubik700, 22, C.ink);
    ty += 26;
  }
  ty += 14;
  const badgeFile = join('printable', 'badges', `${lang}.svg`);
  if (existsSync(badgeFile)) {
    const png = await sharp(await readFile(badgeFile), { density: 300 }).resize({ height: 180 }).png().toBuffer();
    const badge = await doc.embedPng(png);
    const bw = (badge.width / badge.height) * 60;
    sheet.image(badge, colX, ty, bw, 60);
  } else {
    // Немає офіційного значка: проста пігулка з текстом. Значки — printable/badges/<мова>.svg.
    const w = f.nunito700.widthOfTextAtSize(t.appStore, 15) + 40;
    sheet.path(roundRect(w, 52, 26), colX, ty, { fill: C.ink });
    sheet.text(t.appStore, colX + 20, ty + 17, f.nunito700, 15, C.white);
  }
  ty += 60 + 14;
  sheet.text(`apps.apple.com/app/id${APP_ID}`, colX, ty, f.nunito700, 12, C.inkMuted);
  // QR — ще й посилання для тих, хто відкрив PDF на телефоні.
  addLink(sheet.page, url, left, y, box, box);

  const logoW = f.rubik800.widthOfTextAtSize('Fox & Bunny', 28);
  const rowW = 44 + 10 + logoW + 10 + 44;
  const rowX = cx - rowW / 2;
  const rowY = PAGE_H - 72 - 44;
  sheet.image(fox, rowX, rowY, 44, 44);
  sheet.text('Fox & Bunny', rowX + 54, rowY + 9, f.rubik800, 28, C.ink);
  sheet.image(bunny, rowX + 54 + logoW + 10, rowY, 44, 44);
  sheet.footer(f, 7, 72);
}

function addLink(page: PDFPage, url: string, x: number, top: number, w: number, h: number) {
  const ctx = page.doc.context;
  // ctx.obj перетворює рядки на імена, тож URI ставимо окремо як рядок.
  const action = ctx.obj({ Type: 'Action', S: 'URI' }) as PDFDict;
  action.set(PDFName.of('URI'), PDFString.of(url));
  const annot = ctx.register(
    ctx.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [x * PX, (PAGE_H - top - h) * PX, (x + w) * PX, (PAGE_H - top) * PX],
      Border: [0, 0, 0],
      A: action,
    }),
  );
  page.node.addAnnot(annot);
}

/** PDF однієї мови: обкладинка, аркуші карток, остання сторінка. */
export async function buildPdf(lang: string, t: Strings, pages: SourceCard[][]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(t.pageTitle);
  doc.setAuthor('Fox & Bunny');
  doc.setLanguage(lang);
  doc.setCreator('alias-content/scripts/printable.ts');
  const f = await loadFonts(doc);
  const fox = await doc.embedPng(await svgPng(FOX, 416));
  const bunny = await doc.embedPng(await svgPng(BUNNY, 416));

  drawCover(new Sheet(doc.addPage([PAGE_W * PX, PAGE_H * PX])), t, f, fox, bunny);
  const images = new Map<string, PDFImage>();
  const image = async (id: string) => {
    if (!images.has(id)) images.set(id, await cardImage(doc, id));
    return images.get(id)!;
  };
  for (const [i, page] of pages.entries()) {
    const cards = await Promise.all(page.map(async (c) => ({ word: c.words[lang], image: await image(c.id) })));
    drawCards(new Sheet(doc.addPage([PAGE_W * PX, PAGE_H * PX])), t, f, cards, i + 2);
  }
  const fanIds = ['apple', 'sun', 'car'];
  const all = pages.flat();
  const fan = await Promise.all(
    fanIds.map((id) => all.find((c) => c.id === id) ?? all[0]).filter(Boolean).map(async (c) => ({ word: c.words[lang], image: await image(c.id) })),
  );
  await drawBack(doc, new Sheet(doc.addPage([PAGE_W * PX, PAGE_H * PX])), t, f, lang, fan, fox, bunny);
  return doc.save();
}

// ---------- Прев'ю і сторінка ----------

/** Слово кривими з того самого шрифту: у CI немає Rubik, а SVG-текст підставив би інший шрифт. */
async function textPath(text: string, size: number, cx: number, baseline: number): Promise<string> {
  const font = fontkit.create(await readFile(join('fonts', 'Rubik_700Bold.ttf')));
  const run = font.layout(text);
  const scale = size / font.unitsPerEm;
  const width = run.positions.reduce((s, p) => s + p.xAdvance, 0) * scale;
  let x = cx - width / 2;
  let d = '';
  run.glyphs.forEach((g, i) => {
    d += `<path transform="translate(${x.toFixed(2)} ${baseline}) scale(${scale} ${-scale})" d="${g.path.toSVG()}"/>`;
    x += run.positions[i].xAdvance * scale;
  });
  return d;
}

/** Перший аркуш карток як JPEG 1200 px завширшки: для сторінки й Open Graph. */
export async function buildPreview(lang: string, page: SourceCard[]): Promise<Buffer> {
  const k = 1200 / PAGE_W;
  const W = 1200;
  const H = Math.round(PAGE_H * k);
  const composites: sharp.OverlayOptions[] = [];
  let words = '';
  for (const [i, card] of page.entries()) {
    const x = (57 + (i % 2) * 340) * k;
    const y = (51 + Math.floor(i / 2) * 340) * k;
    const img = await sharp(join('images', `${card.id}.png`)).resize(Math.round(250 * k), Math.round(250 * k), { fit: 'inside' }).png().toBuffer();
    composites.push({ input: img, left: Math.round(x + 45 * k), top: Math.round(y + 23 * k) });
    words += await textPath(card.words[lang], 29 * k, x + 170 * k, y + (287 + 23) * k);
  }
  const lines: string[] = [];
  for (const x of [57, 397, 737]) lines.push(`<line x1="${x * k}" y1="0" x2="${x * k}" y2="${H}"/>`);
  for (const y of [51, 391, 731, 1071]) lines.push(`<line x1="0" y1="${y * k}" x2="${W}" y2="${y * k}"/>`);
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><g stroke="#9A94A6" stroke-width="1.5" stroke-dasharray="17 11">${lines.join('')}</g><g fill="#1E1B2E">${words}</g></svg>`;
  return sharp({ create: { width: W, height: H, channels: 3, background: '#ffffff' } })
    .composite([...composites, { input: Buffer.from(overlay), left: 0, top: 0 }])
    .jpeg({ quality: 82 })
    .toBuffer();
}

export const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function pageHtml(lang: string, t: Strings, all: Record<string, Strings>, opts: { pdfBytes: number; badge: boolean }): string {
  const e = escapeHtml;
  const langs = Object.keys(all);
  const url = (l: string) => `${SITE}printable/${l}/`;
  const hreflang = langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}">`).join('\n');
  const nav = langs
    .map((l) => (l === lang ? `<a href="../${l}/" aria-current="page">${e(all[l].languageName)}</a>` : `<a href="../${l}/" lang="${l}">${e(all[l].languageName)}</a>`))
    .join('');
  const rules = [t.rule1, t.rule2, t.rule3, t.rule4, t.rule5, t.rule6].map((r) => `<li>${e(r)}</li>`).join('\n');
  const size = (opts.pdfBytes / 1024 / 1024).toFixed(1).replace('.', lang === 'en' ? '.' : ',');
  const mb = `${size} ${{ uk: 'МБ', fr: 'Mo' }[lang] ?? 'MB'}`;
  const store = opts.badge
    ? `<a class="badge" href="${e(appStoreUrl(lang))}"><img src="app-store.svg" alt="${e(t.appStore)}" height="54"></a>`
    : `<a class="store" href="${e(appStoreUrl(lang))}">${e(t.appStore)}</a>`;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(t.pageTitle)} — Fox &amp; Bunny</title>
<meta name="description" content="${e(t.pageDescription)}">
<link rel="canonical" href="${url(lang)}">
${hreflang}
<link rel="alternate" hreflang="x-default" href="${url('en')}">
<meta property="og:title" content="${e(t.pageTitle)}">
<meta property="og:description" content="${e(t.pageDescription)}">
<meta property="og:image" content="${url(lang)}preview.jpg">
<meta property="og:url" content="${url(lang)}">
<meta property="og:type" content="website">
<style>
  :root { color-scheme: light dark; }
  body { max-width: 42rem; margin: 0 auto; padding: 2rem 1rem 4rem; font: 1rem/1.6 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  nav { display: flex; flex-wrap: wrap; gap: .25rem 1rem; font-size: .95rem; }
  nav [aria-current] { font-weight: 700; color: inherit; text-decoration: none; }
  h1 { font-size: 1.9rem; line-height: 1.25; margin: 2rem 0 0; text-wrap: balance; }
  .lead { font-size: 1.1rem; margin: .75rem 0 0; }
  figure { margin: 2rem 0 0; text-align: center; }
  figure img { width: 100%; max-width: 30rem; height: auto; border: 1px solid #EADFCB; border-radius: 14px; }
  figcaption { font-size: .85rem; opacity: .75; margin-top: .5rem; }
  .download { display: flex; flex-direction: column; align-items: center; gap: .5rem; margin-top: 1.75rem; }
  .download a { display: inline-flex; align-items: center; min-height: 56px; padding: 0 2rem; border-radius: 999px; background: #FFC43D; box-shadow: 0 6px 0 #D99A12; color: #1E1B2E; text-decoration: none; font-weight: 800; font-size: 1.15rem; }
  .download small { font-size: .85rem; opacity: .75; margin-top: .4rem; }
  h2 { font-size: 1.25rem; margin: 3rem 0 0; }
  ol { padding-left: 1.4rem; }
  li + li { margin-top: .4rem; }
  .store { display: inline-block; margin-top: 1rem; padding: .8rem 1.4rem; border-radius: 12px; background: #1E1B2E; color: #fff; text-decoration: none; font-weight: 700; }
  .badge { display: inline-block; margin-top: 1rem; }
  hr { margin: 3rem 0 1.5rem; border: none; border-top: 1px solid currentColor; opacity: .2; }
  footer { font-size: .9rem; opacity: .8; }
</style>
</head>
<body>
<nav>${nav}</nav>
<h1>${e(t.pageTitle)}</h1>
<p class="lead">${e(t.pageDescription)}</p>
<figure>
<img src="preview.jpg" width="1200" height="${Math.round((PAGE_H * 1200) / PAGE_W)}" alt="${e(t.previewCaption)}">
<figcaption>${e(t.previewCaption)}</figcaption>
</figure>
<div class="download">
<a href="${pdfName(lang)}" download>${e(t.download)}</a>
<small>${e(t.fileInfo)} · ${mb}</small>
</div>
<h2>${e(t.howTo)}</h2>
<ol>
${rules}
</ol>
<h2>${e(t.ctaTitle)}</h2>
<p>${e(t.ctaText)}</p>
${store}
<hr>
<footer>Fox &amp; Bunny · <a href="../../support/">${e(t.support)}</a> · <a href="../../privacy/">${e(t.privacy)}</a></footer>
</body>
</html>
`;
}

function indexHtml(all: Record<string, Strings>): string {
  const items = Object.entries(all)
    .map(([l, t]) => `<li><a href="${l}/" lang="${l}" hreflang="${l}">${escapeHtml(t.pageTitle)}</a> — ${escapeHtml(t.languageName)}</li>`)
    .join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fox &amp; Bunny — printable cards</title>
<style>:root{color-scheme:light dark}body{max-width:42rem;margin:0 auto;padding:2rem 1rem 4rem;font:1rem/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}li+li{margin-top:.5rem}</style>
</head>
<body>
<h1>Fox &amp; Bunny — printable cards</h1>
<ul>
${items}
</ul>
</body>
</html>
`;
}

export function sitemap(langs: readonly string[]): string {
  const urls = [`${SITE}printable/`, ...langs.map((l) => `${SITE}printable/${l}/`)].map((u) => `  <url><loc>${u}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/**
 * Пише `printable/` і `sitemap.xml` у `out`. Мови — опубліковані мови карток, для яких заповнені всі рядки
 * `printable/strings.csv`; решта пропускається з попередженням, збірка не падає.
 */
export async function writePrintables(cards: readonly SourceCard[], locales: readonly string[], out: string): Promise<string[]> {
  const { strings } = parseStrings(await readFile(join('printable', 'strings.csv'), 'utf8'));
  const pages = cardPages(cards);
  const langs = locales.filter((l) => strings[l]);
  const skipped = locales.filter((l) => !strings[l]);
  if (skipped.length > 0) console.warn(`Друковані картки: немає всіх рядків у printable/strings.csv для ${skipped.join(', ')} — пропускаємо`);
  const published = Object.fromEntries(langs.map((l) => [l, strings[l]]));

  for (const lang of langs) {
    const dir = join(out, 'printable', lang);
    await mkdir(dir, { recursive: true });
    const pdf = await buildPdf(lang, strings[lang], pages);
    await writeFile(join(dir, pdfName(lang)), pdf);
    await writeFile(join(dir, 'preview.jpg'), await buildPreview(lang, pages[0] ?? []));
    const badgeFile = join('printable', 'badges', `${lang}.svg`);
    const badge = existsSync(badgeFile);
    if (badge) await writeFile(join(dir, 'app-store.svg'), await readFile(badgeFile));
    await writeFile(join(dir, 'index.html'), pageHtml(lang, strings[lang], published, { pdfBytes: pdf.length, badge }));
    console.log(`  printable/${lang}: ${(pdf.length / 1024 / 1024).toFixed(1)} МБ`);
  }
  await writeFile(join(out, 'printable', 'index.html'), indexHtml(published));
  await writeFile(join(out, 'sitemap.xml'), sitemap(langs));
  return langs;
}
