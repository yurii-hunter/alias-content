import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';

import { PDFDocument, PDFName, PDFDict, PDFString } from 'pdf-lib';

import { parseSheet } from './csv.ts';
import { STRING_KEYS, appStoreUrl, balance, buildPdf, cardPages, pageHtml, parseStrings, pdfName, sitemap, wrap } from './printable.ts';
import type { SourceCard } from './types.ts';

const width = (s: string) => s.length * 10;

const card = (id: string, tier: 'free' | 'full'): SourceCard => ({ id, tier, preview: false, category: 'pets', words: { uk: id } });

describe('printable', () => {
  it('keeps only languages with every string', () => {
    const rows = STRING_KEYS.map((k) => `${k},${k}-uk,${k === 'rule6' ? '' : `${k}-en`}`).join('\n');
    const { strings, incomplete } = parseStrings(`key,uk,en\n${rows}\n`);
    assert.deepEqual(Object.keys(strings), ['uk']);
    assert.deepEqual(incomplete, ['en']);
    assert.equal(strings.uk.rule1, 'rule1-uk');
  });

  it('has every string for all six languages in printable/strings.csv', async () => {
    const { strings, incomplete } = parseStrings(await readFile('printable/strings.csv', 'utf8'));
    assert.deepEqual(Object.keys(strings), ['uk', 'en', 'de', 'pl', 'es', 'fr']);
    assert.deepEqual(incomplete, []);
  });

  it('puts free cards six per page in table order', () => {
    const cards = [card('a', 'free'), card('x', 'full'), ...'bcdefgh'.split('').map((id) => card(id, 'free'))];
    const pages = cardPages(cards);
    assert.deepEqual(pages.map((p) => p.map((c) => c.id)), [['a', 'b', 'c', 'd', 'e', 'f'], ['g', 'h']]);
  });

  it('tags App Store links with the language campaign', () => {
    assert.match(appStoreUrl('pl'), /^https:\/\/apps\.apple\.com\/app\/apple-store\/id6816392085\?.*ct=printable-pl/);
  });

  it('wraps and balances lines', () => {
    assert.deepEqual(wrap('aa bb cc', width, 50), ['aa bb', 'cc']);
    assert.deepEqual(balance('aaaa bbbb cccc dd', width, 140), ['aaaa bbbb', 'cccc dd']);
    assert.deepEqual(balance('short', width, 140), ['short']);
  });

  it('builds a 7-page PDF with a working App Store link', async () => {
    const { sheet } = parseSheet(await readFile('cards.csv', 'utf8'));
    const cards: SourceCard[] = sheet.rows.map((r) => ({ id: r.id, tier: r.tier as 'free' | 'full', preview: r.preview === 'yes', category: r.category, words: r.words }));
    const { strings } = parseStrings(await readFile('printable/strings.csv', 'utf8'));
    const pages = cardPages(cards);
    assert.equal(pages.length, 5);
    assert.ok(pages.every((p) => p.length === 6));

    const pdf = await PDFDocument.load(await buildPdf('uk', strings.uk, pages));
    assert.equal(pdf.getPageCount(), 7);
    assert.equal(pdf.getTitle(), strings.uk.pageTitle);
    const annots = pdf.getPage(6).node.Annots();
    const link = annots?.lookup(0, PDFDict);
    const uri = link?.lookup(PDFName.of('A'), PDFDict).get(PDFName.of('URI'));
    assert.ok(uri instanceof PDFString);
    assert.equal(uri.decodeText(), appStoreUrl('uk'));
  });

  it('writes a static page with hreflang and the PDF link', async () => {
    const { strings } = parseStrings(await readFile('printable/strings.csv', 'utf8'));
    const html = pageHtml('de', strings.de, strings, { pdfBytes: 2_000_000, badge: false });
    assert.match(html, /<html lang="de">/);
    for (const lang of Object.keys(strings)) assert.ok(html.includes(`hreflang="${lang}" href="https://yurii-hunter.github.io/alias-content/printable/${lang}/"`));
    assert.ok(html.includes(`href="${pdfName('de')}" download`));
    assert.ok(html.includes('ct=printable-de'));
    assert.ok(!/<script|https:\/\/fonts\./.test(html), 'без скриптів і сторонніх ресурсів');
  });

  it('lists printable pages in the sitemap', () => {
    const xml = sitemap(['uk', 'en']);
    assert.ok(xml.includes('<loc>https://yurii-hunter.github.io/alias-content/printable/uk/</loc>'));
    assert.ok(xml.includes('<loc>https://yurii-hunter.github.io/alias-content/printable/</loc>'));
  });
});
