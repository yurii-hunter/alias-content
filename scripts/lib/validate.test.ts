import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import type { RawRow, Sheet } from './types.ts';
import { completeLocales, FREE_CARD_COUNT, validateSheet, type ValidateOptions } from './validate.ts';

const row = (id: string, words: Record<string, string> = { uk: 'слово', en: 'word' }, rest: Partial<RawRow> = {}): RawRow => ({
  line: 2,
  id,
  tier: 'free',
  preview: '',
  words,
  ...rest,
});

const sheetOf = (...rows: RawRow[]): Sheet => ({ languages: ['uk', 'en'], rows });

const options = (sheet: Sheet, extra: Partial<ValidateOptions> = {}): ValidateOptions => ({
  imageIds: new Set(sheet.rows.map((r) => r.id)),
  publishedLocales: [],
  requireFreeCount: false,
  ...extra,
});

function errorsOf(sheet: Sheet, extra: Partial<ValidateOptions> = {}) {
  return validateSheet(sheet, options(sheet, extra)).errors;
}

describe('validateSheet', () => {
  it('accepts a valid sheet', () => {
    const sheet = sheetOf(row('apple'), row('giraffe', undefined, { tier: 'full', preview: 'yes' }));
    const { cards, errors } = validateSheet(sheet, options(sheet));
    assert.deepEqual(errors, []);
    assert.deepEqual(cards[1], { id: 'giraffe', tier: 'full', preview: true, words: { uk: 'слово', en: 'word' } });
  });

  it('rejects duplicate ids', () => {
    assert.match(errorsOf(sheetOf(row('apple'), row('apple', undefined, { line: 3 })))[0], /уже є в рядку 2/);
  });

  it('rejects malformed ids, tiers and preview values', () => {
    const errors = errorsOf(sheetOf(row('Big Apple', undefined, { tier: 'paid', preview: 'y' })));
    assert.equal(errors.length, 3);
  });

  it('allows preview only on full cards', () => {
    assert.match(errorsOf(sheetOf(row('apple', undefined, { preview: 'yes' })))[0], /лише в повних/);
  });

  it('requires an image for every card and a card for every image', () => {
    const sheet = sheetOf(row('apple'));
    const errors = errorsOf(sheet, { imageIds: new Set(['pear']) });
    assert.equal(errors.length, 2);
    assert.match(errors[0], /немає картинки images\/apple.png/);
    assert.match(errors[1], /images\/pear.png/);
  });

  it('counts free cards only when asked', () => {
    const sheet = sheetOf(row('apple'));
    assert.deepEqual(errorsOf(sheet), []);
    assert.match(errorsOf(sheet, { requireFreeCount: true })[0], new RegExp(`рівно ${FREE_CARD_COUNT}`));

    const full = sheetOf(...Array.from({ length: FREE_CARD_COUNT }, (_, i) => row(`c${i}`)));
    assert.deepEqual(errorsOf(full, { requireFreeCount: true }), []);
  });

  it('allows blank words in unpublished languages but not in published ones', () => {
    const sheet = sheetOf(row('apple'), row('sun', { uk: 'сонце' }));
    assert.deepEqual(errorsOf(sheet, { publishedLocales: ['uk'] }), []);
    assert.match(errorsOf(sheet, { publishedLocales: ['uk', 'en'] })[0], /опублікованої мови en/);
  });

  it('rejects dropping a published language column', () => {
    assert.match(errorsOf(sheetOf(row('apple')), { publishedLocales: ['de'] })[0], /колонки опублікованої мови de/);
  });

  it('needs at least one fully translated language', () => {
    assert.match(errorsOf(sheetOf(row('apple', { uk: 'яблуко' }), row('sun', { en: 'sun' })))[0], /жодної мови/);
  });
});

describe('completeLocales', () => {
  it('keeps only languages where every card has a word', () => {
    const cards = [
      { id: 'a', tier: 'free' as const, preview: false, words: { uk: 'а', en: 'a', de: 'a' } },
      { id: 'b', tier: 'free' as const, preview: false, words: { uk: 'б', de: 'b' } },
    ];
    assert.deepEqual(completeLocales(['uk', 'en', 'de'], cards), ['uk', 'de']);
  });
});
