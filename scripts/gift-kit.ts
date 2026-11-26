// Подарунковий набір для садочка (українською): 96 карток, дві картки-вкладки і розгортка коробки.
// Запуск: node scripts/gift-kit.ts [кампанія]  →  dist/gift-kit/fox-bunny-sadok-uk.pdf
// Кампанія — мітка `ct` у QR на дні коробки (за замовчуванням kit-sadok-1), щоб бачити набір в App Store Connect.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { parse } from 'csv-parse/sync';
import { PDFDocument, degrees } from 'pdf-lib';
import type { PDFFont, PDFImage, PDFPage, RGB } from 'pdf-lib';
import QRCode from 'qrcode';

import { BUNNY, C, CARDS_PER_PAGE, FOX, PAGE_H, PAGE_W, PX, Sheet, cardImage, drawCards, loadFonts, parseStrings, svgPng, wrap } from './lib/printable.ts';
import type { Fonts } from './lib/printable.ts';

const LANG = 'uk';
const CAMPAIGN = process.argv[2] ?? 'kit-sadok-1';
const QR_URL = `https://apps.apple.com/app/apple-store/id6816392085?pt=129516479&ct=${CAMPAIGN}&mt=8`;

/** 30 безкоштовних і 66 найпростіших для 4–5 років. */
const IDS = 'dog,cat,cow,pig,horse,rabbit,bear,lion,fish,sun,moon,tree,flower,apple,banana,watermelon,carrot,cake,ice_cream,house,chair,bed,toothbrush,ball,balloon,teddy_bear,car,bus,train,plane,sheep,hen,duck,mouse,turtle,rooster,wolf,fox,hedgehog,squirrel,tiger,monkey,frog,penguin,owl,elephant,giraffe,crocodile,hare,whale,dolphin,octopus,crab,butterfly,bee,ladybug,snail,spider,star,cloud,rainbow,snowflake,rain,pear,strawberry,tomato,pumpkin,lemon,bread,egg,pizza,milk,ship,bicycle,tractor,rocket,fire_truck,helicopter,cup,spoon,clock,woolly_hat,boots,umbrella,doll,swing,scooter,pencil,book,drum,hand,nose,ear,snowman,crown,robot'.split(',');

// Розміри коробки, мм. Дно: картки 90×90 + відсік для пісочного годинника. Кришка на 2,5 мм ширша.
const BASE = { w: 105, l: 140, h: 45 };
const LID = { w: 107.5, l: 142.5, h: 25 };
const DIVIDER = { w: 102, h: 43, at: 95 };
const TAB = 12;
const TAPER = 3;

const TEXT = {
  rulesTitle: 'Як грати',
  rules: [
    'Дві команди, Лисички та Зайчики, грають по черзі.',
    'Перемішайте картки і складіть стосом картинками донизу.',
    'Хто пояснює, бере верхню картку так, щоб інші не бачили.',
    'Розкажи про картинку, але не називай саме слово. Твоя команда вгадує.',
    'Вгадали — картка лишається в команди. Не знаєш, як пояснити, — поклади її під низ стосу.',
    'Хід триває хвилину: переверніть пісочний годинник. Перемагає команда, яка зібрала більше карток.',
  ],
  anyWay: 'Помилок тут не буває: кожне пояснення — вже гра.',
  littleOnes: 'Для найменших: грайте без часу й без рахунку, просто по черзі пояснюйте картинки.',
  ideasTitle: 'Ще способи грати',
  ideas: [
    ['Без слів.', 'Покажи картинку жестами, а інші вгадують.'],
    ['Голосом.', 'Покажи, як звучить: тварина, машина, дощ.'],
    ['За темами.', 'Розкладіть картки на купки: тварини, їжа, транспорт.'],
    ['Казка.', 'Витягніть три картки і складіть з ними історію.'],
    ['Що зникло?', 'Покладіть п\'ять карток, одну сховайте. Хто помітить, якої немає?'],
  ],
  tagline: 'Аліас з картинками',
  forKids: 'для дітей від 4 років · читати не треба',
  count: `${IDS.length} карток`,
  phone: 'Ця гра є і на телефоні',
  red: 'Лисички',
  blue: 'Зайчики',
};

// ---------- Малювання в міліметрах (вісь y вниз) ----------

const K = 72 / 25.4;
const A4 = { w: 210, h: 297 };

class Mm {
  readonly page: PDFPage;
  ox = 0;
  oy = 0;
  constructor(page: PDFPage) {
    this.page = page;
  }
  at(ox: number, oy: number) {
    this.ox = ox;
    this.oy = oy;
    return this;
  }
  X(x: number) {
    return (this.ox + x) * K;
  }
  Y(y: number) {
    return (A4.h - this.oy - y) * K;
  }
  path(d: string, opts: { stroke?: RGB; width?: number; fill?: RGB; dash?: number[] }) {
    this.page.drawSvgPath(d, {
      x: this.X(0),
      y: this.Y(0),
      scale: K,
      color: opts.fill,
      borderColor: opts.stroke,
      borderWidth: opts.stroke ? (opts.width ?? 0.75) / K : undefined,
      borderDashArray: opts.dash?.map((v) => v / K),
      borderLineCap: 1,
    });
  }
  line(x1: number, y1: number, x2: number, y2: number, color: RGB, width = 0.75, dash?: number[]) {
    this.page.drawLine({ start: { x: this.X(x1), y: this.Y(y1) }, end: { x: this.X(x2), y: this.Y(y2) }, thickness: width, color, dashArray: dash });
  }
  /** Текст з центром у (cx, cy), повернутий проти годинникової стрілки на `rot`°. */
  text(s: string, cx: number, cy: number, font: PDFFont, size: number, color: RGB, rot = 0) {
    const w = font.widthOfTextAtSize(s, size);
    const a = (rot * Math.PI) / 180;
    const dx = -w / 2;
    const dy = -size * 0.36;
    this.page.drawText(s, {
      x: this.X(cx) + dx * Math.cos(a) - dy * Math.sin(a),
      y: this.Y(cy) + dx * Math.sin(a) + dy * Math.cos(a),
      size,
      font,
      color,
      rotate: degrees(rot),
    });
  }
  /** Текст від лівого краю: `top` — верх рядка. */
  left(s: string, x: number, top: number, font: PDFFont, size: number, color: RGB) {
    this.page.drawText(s, { x: this.X(x), y: this.Y(top) - size * 0.8, size, font, color });
  }
  image(img: PDFImage, cx: number, cy: number, w: number, h: number, rot = 0) {
    const a = (rot * Math.PI) / 180;
    const dx = (-w / 2) * K;
    const dy = (-h / 2) * K;
    this.page.drawImage(img, {
      x: this.X(cx) + dx * Math.cos(a) - dy * Math.sin(a),
      y: this.Y(cy) + dx * Math.sin(a) + dy * Math.cos(a),
      width: w * K,
      height: h * K,
      rotate: degrees(rot),
    });
  }
  circle(cx: number, cy: number, r: number, fill: RGB, stroke?: RGB, width = 0) {
    this.page.drawCircle({ x: this.X(cx), y: this.Y(cy), size: r * K, color: fill, borderColor: stroke, borderWidth: width });
  }
}

const pathOf = (pts: [number, number][]) => `M${pts.map(([x, y]) => `${x} ${y}`).join(' L')} Z`;
const rrect = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z`;

const CUT = { stroke: C.ink, width: 0.9 };
const FOLD_DASH = [4, 2.5];

/**
 * Розгортка коробки без кришки: дно w×l, чотири стінки висотою h, клапани на коротких стінках
 * загинаються всередину і клеяться до довгих. Повертає контур (різати) і лінії згину.
 */
export function trayNet(w: number, l: number, h: number, t = TAB, i = TAPER) {
  const outline: [number, number][] = [
    [h, 0], [h + w, 0],
    [h + w + t, i], [h + w + t, h - i], [h + w, h],
    [2 * h + w, h], [2 * h + w, h + l], [h + w, h + l],
    [h + w + t, h + l + i], [h + w + t, 2 * h + l - i], [h + w, 2 * h + l],
    [h, 2 * h + l],
    [h - t, 2 * h + l - i], [h - t, h + l + i], [h, h + l],
    [0, h + l], [0, h], [h, h],
    [h - t, h - i], [h - t, i],
  ];
  const folds: [number, number, number, number][] = [
    [h, h, h + w, h], [h, h + l, h + w, h + l], [h, h, h, h + l], [h + w, h, h + w, h + l],
    [h, 0, h, h], [h + w, 0, h + w, h], [h, h + l, h, 2 * h + l], [h + w, h + l, h + w, 2 * h + l],
  ];
  return { outline, folds, width: 2 * h + w, height: 2 * h + l };
}

function drawNet(m: Mm, net: ReturnType<typeof trayNet>) {
  for (const [x1, y1, x2, y2] of net.folds) m.line(x1, y1, x2, y2, C.cut, 0.75, FOLD_DASH.map((v) => v * K));
  m.path(pathOf(net.outline), CUT);
}

/** Під розгорткою: що різати, що згинати, і лінійка 50 мм для перевірки масштабу. */
function legend(m: Mm, f: Fonts, y: number, title: string) {
  m.at(0, 0);
  m.left(title, 15, 10, f.rubik700, 12, C.ink);
  m.left('Друкуйте на картоні 250–300 г/м², масштаб 100% («Фактичний розмір»).', 15, 16.5, f.nunito700, 8.5, C.inkMuted);
  m.line(15, y, 30, y, C.ink, 0.9);
  m.left('різати', 33, y - 1.6, f.nunito700, 8.5, C.inkMuted);
  m.line(55, y, 70, y, C.cut, 0.75, FOLD_DASH.map((v) => v * K));
  m.left('згинати', 73, y - 1.6, f.nunito700, 8.5, C.inkMuted);
  m.line(130, y, 180, y, C.ink, 0.9);
  m.line(130, y - 1.5, 130, y + 1.5, C.ink, 0.9);
  m.line(180, y - 1.5, 180, y + 1.5, C.ink, 0.9);
  m.text('50 мм — перевірте лінійкою', 155, y + 4, f.nunito700, 7.5, C.inkMuted);
}

/** Іконка й підпис в один рядок, з центром у (cx, cy), повернуті на `rot`°. */
function iconLabel(m: Mm, img: PDFImage, label: string, cx: number, cy: number, f: PDFFont, size: number, color: RGB, rot: number) {
  const icon = 13;
  const gap = 2.5;
  const tw = f.widthOfTextAtSize(label, size) / K;
  const total = icon + gap + tw;
  const a = (rot * Math.PI) / 180;
  const along = (d: number): [number, number] => [cx + d * Math.cos(a), cy - d * Math.sin(a)];
  const [ix, iy] = along(-total / 2 + icon / 2);
  const [tx, ty] = along(total / 2 - tw / 2);
  m.image(img, ix, iy, icon, icon, rot);
  m.text(label, tx, ty, f, size, color, rot);
}

async function basePage(doc: PDFDocument, f: Fonts, fox: PDFImage, bunny: PDFImage) {
  const m = new Mm(doc.addPage([A4.w * K, A4.h * K]));
  const net = trayNet(BASE.w, BASE.l, BASE.h);
  m.at((A4.w - net.width) / 2, 30);
  drawNet(m, net);
  // Зовнішній бік дна.
  const { w, l, h } = BASE;
  const cx = h + w / 2;
  let y = h + 22;
  m.image(fox, cx - 9, y, 16, 16);
  m.image(bunny, cx + 9, y, 16, 16);
  y += 17;
  m.text('Fox & Bunny', cx, y, f.rubik800, 18, C.ink);
  y += 8;
  m.text(TEXT.tagline, cx, y, f.rubik700, 11, C.ink);
  y += 6;
  m.text(TEXT.count, cx, y, f.nunito700, 8.5, C.inkMuted);
  const qr = await doc.embedPng(await QRCode.toBuffer(QR_URL, { errorCorrectionLevel: 'M', margin: 2, scale: 12, color: { dark: '#1E1B2EFF', light: '#FFFFFFFF' } }));
  const q = 24;
  const qy = h + l - 20 - q / 2;
  m.image(qr, cx, qy, q, q);
  m.text(TEXT.phone, cx, qy + q / 2 + 5, f.nunito700, 7.5, C.inkMuted);
  legend(m, f, 30 + net.height + 12, 'Коробка · дно');
}

async function lidPage(doc: PDFDocument, f: Fonts, fox: PDFImage, bunny: PDFImage) {
  const m = new Mm(doc.addPage([A4.w * K, A4.h * K]));
  const net = trayNet(LID.w, LID.l, LID.h);
  const top = 26;
  m.at((A4.w - net.width) / 2, top);
  drawNet(m, net);
  const { w, l, h } = LID;
  const cx = h + w / 2;
  // Верх кришки.
  m.path(rrect(h + 5, h + 5, w - 10, l - 10, 6), { stroke: C.line, width: 2 });
  // Без підпису «Подарунок групі»: блок по центру кришки.
  let y = h + 53;
  m.circle(cx - 15, y, 14, C.redTint, C.ink, 1.6);
  m.circle(cx + 15, y, 14, C.blueTint, C.ink, 1.6);
  m.image(fox, cx - 15, y, 21, 21);
  m.image(bunny, cx + 15, y, 21, 21);
  y += 29;
  m.text('Fox & Bunny', cx, y, f.rubik800, 27, C.ink);
  y += 11;
  m.text(TEXT.tagline, cx, y, f.rubik700, 15, C.ink);
  y += 7.5;
  m.text(TEXT.forKids, cx, y, f.nunito700, 8.5, C.inkMuted);
  // Довгі стінки: назва вздовж; кришка опускається, тож низ тексту — до вільного краю стінки.
  m.text('Fox & Bunny', h / 2, h + l / 2, f.rubik800, 17, C.ink, -90);
  m.text('Fox & Bunny', h + w + h / 2, h + l / 2, f.rubik800, 17, C.ink, 90);
  // Короткі стінки: Лисички спереду, Зайчики ззаду.
  iconLabel(m, fox, TEXT.red, cx, h + l + h / 2, f.rubik700, 15, C.red, 0);
  iconLabel(m, bunny, TEXT.blue, cx, h / 2, f.rubik700, 15, C.blue, 180);

  // Перегородка: приклеюється клапанами до довгих стінок дна.
  const d = DIVIDER;
  const dw = d.w + 2 * TAB;
  const dy = top + net.height + 14;
  m.at((A4.w - dw) / 2, dy);
  m.line(TAB, 0, TAB, d.h, C.cut, 0.75, FOLD_DASH.map((v) => v * K));
  m.line(TAB + d.w, 0, TAB + d.w, d.h, C.cut, 0.75, FOLD_DASH.map((v) => v * K));
  m.path(pathOf([[0, TAPER], [TAB, 0], [TAB + d.w, 0], [dw, TAPER], [dw, d.h - TAPER], [TAB + d.w, d.h], [TAB, d.h], [0, d.h - TAPER]]), CUT);
  m.text(`Перегородка: приклейте на ${(d.at / 10).toFixed(1).replace('.', ',')} см від короткої стінки дна`, dw / 2, d.h / 2, f.nunito700, 7.5, C.inkMuted);
  legend(m, f, dy + d.h + 9, 'Коробка · кришка і перегородка');
}

/** Абзац з жирним початком: повертає висоту, мм. */
function rich(m: Mm, lead: string, rest: string, x: number, top: number, width: number, f: Fonts, size: number, lh: number): number {
  const leadW = lead ? f.rubik700.widthOfTextAtSize(`${lead} `, size) / K : 0;
  const words = rest.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const word of words) {
    const avail = lines.length === 0 ? width - leadW : width;
    const next = cur ? `${cur} ${word}` : word;
    if (cur && f.nunito700.widthOfTextAtSize(next, size) / K > avail) {
      lines.push(cur);
      cur = word;
    } else cur = next;
  }
  if (cur) lines.push(cur);
  if (lead) m.left(lead, x, top, f.rubik700, size, C.ink);
  lines.forEach((line, j) => m.left(line, j === 0 ? x + leadW : x, top + j * lh, f.nunito700, size, C.ink));
  return lines.length * lh;
}

function infoCard(m: Mm, f: Fonts, fox: PDFImage, bunny: PDFImage, title: string, items: [string, string][], note?: string) {
  const W = 100;
  const H = 135;
  m.path(pathOf([[0, 0], [W, 0], [W, H], [0, H]]), CUT);
  m.image(fox, W / 2 - 8.5, 13, 14, 14);
  m.image(bunny, W / 2 + 8.5, 13, 14, 14);
  m.text(title, W / 2, 27, f.rubik700, 16, C.ink);
  let y = 35;
  const size = 9.5;
  const lh = 4.5;
  items.forEach(([lead, rest], i) => {
    m.circle(10, y + 1.9, 2.9, i % 2 === 0 ? C.red : C.blue);
    m.text(String(i + 1), 10, y + 1.9, f.rubik800, 8, C.white);
    y += rich(m, lead, rest, 16, y, W - 16 - 7, f, size, lh) + 2.6;
  });
  if (note) {
    const lines = wrap(note, (s) => f.nunito700.widthOfTextAtSize(s, 8.5) / K, W - 22);
    const bh = lines.length * 4.1 + 6;
    const by = H - 7 - bh;
    m.path(rrect(6, by, W - 12, bh, 4), { stroke: C.line, width: 1.6 });
    lines.forEach((line, j) => m.left(line, 11, by + 3.2 + j * 4.1, f.nunito700, 8.5, C.inkMuted));
  }
  return y;
}

function cardsInfoPage(doc: PDFDocument, f: Fonts, fox: PDFImage, bunny: PDFImage) {
  const m = new Mm(doc.addPage([A4.w * K, A4.h * K]));
  m.at(0, 0);
  m.left('Вкладки в коробку', 15, 10, f.rubik700, 12, C.ink);
  m.left('Можна на звичайному папері; щоб не м\'ялися — заламінуйте.', 15, 16.5, f.nunito700, 8.5, C.inkMuted);
  m.at(5, 28);
  const end = infoCard(m, f, fox, bunny, TEXT.rulesTitle, TEXT.rules.map((r) => ['', r]), TEXT.littleOnes);
  m.at(105, 28);
  infoCard(m, f, fox, bunny, TEXT.ideasTitle, TEXT.ideas as [string, string][], TEXT.anyWay);
  return end;
}

async function main() {
  const rows: Record<string, string>[] = parse(await readFile('cards.csv', 'utf8'), { columns: true, bom: true });
  const byId = new Map(rows.map((r) => [r.id, r]));
  const missing = IDS.filter((id) => !byId.has(id));
  if (missing.length) throw new Error(`Немає в cards.csv: ${missing.join(', ')}`);
  const { strings } = parseStrings(await readFile(join('printable', 'strings.csv'), 'utf8'));
  const t = strings[LANG];

  const doc = await PDFDocument.create();
  doc.setTitle('Fox & Bunny — аліас з картинками для садочка');
  doc.setAuthor('Fox & Bunny');
  doc.setLanguage(LANG);
  doc.setCreator('alias-content/scripts/gift-kit.ts');
  const f = await loadFonts(doc);
  const fox = await doc.embedPng(await svgPng(FOX, 416));
  const bunny = await doc.embedPng(await svgPng(BUNNY, 416));

  await basePage(doc, f, fox, bunny);
  await lidPage(doc, f, fox, bunny);
  const rulesEnd = cardsInfoPage(doc, f, fox, bunny);

  for (let i = 0; i < IDS.length; i += CARDS_PER_PAGE) {
    const cards = await Promise.all(
      IDS.slice(i, i + CARDS_PER_PAGE).map(async (id) => ({ word: byId.get(id)![LANG], image: await cardImage(doc, id) })),
    );
    drawCards(new Sheet(doc.addPage([PAGE_W * PX, PAGE_H * PX])), t, f, cards, i / CARDS_PER_PAGE + 1);
  }

  const out = join('dist', 'gift-kit');
  await mkdir(out, { recursive: true });
  const file = join(out, `fox-bunny-sadok-${LANG}.pdf`);
  const bytes = await doc.save();
  await writeFile(file, bytes);
  console.log(`${file}: ${doc.getPageCount()} сторінок, ${(bytes.length / 1024 / 1024).toFixed(1)} МБ; QR → ${QR_URL}; правила до ${rulesEnd.toFixed(0)} мм`);
}

await main();
