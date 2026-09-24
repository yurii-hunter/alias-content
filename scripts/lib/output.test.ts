import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { buildCardsFile, buildManifest, contentHash, contentVersion, imagePath } from './output.ts';

describe('output', () => {
  it('names images by id and content hash', () => {
    const a = imagePath('apple', new Uint8Array([1, 2, 3]));
    assert.match(a, /^img\/apple\.[0-9a-f]{8}\.webp$/);
    assert.equal(imagePath('apple', new Uint8Array([1, 2, 3])), a);
    assert.notEqual(imagePath('apple', new Uint8Array([1, 2, 4])), a);
  });

  it('writes only published words and marks previews', () => {
    const file = buildCardsFile(
      [
        { id: 'apple', tier: 'free', preview: false, words: { uk: 'яблуко', en: 'apple', de: '' } },
        { id: 'giraffe', tier: 'full', preview: true, words: { uk: 'жирафа', en: 'giraffe' } },
      ],
      ['uk', 'en'],
      new Map([
        ['apple', 'img/apple.1.webp'],
        ['giraffe', 'img/giraffe.2.webp'],
      ]),
    );
    assert.deepEqual(file.cards, [
      { id: 'apple', tier: 'free', image: 'img/apple.1.webp', words: { uk: 'яблуко', en: 'apple' } },
      { id: 'giraffe', tier: 'full', preview: true, image: 'img/giraffe.2.webp', words: { uk: 'жирафа', en: 'giraffe' } },
    ]);
  });

  it('builds the manifest', () => {
    const version = contentVersion(new Date('2026-09-23T22:30:00Z'), 17);
    assert.equal(version, '2026-09-23.17');
    assert.deepEqual(buildManifest(['uk'], `cards.${contentHash('x')}.json`, version), {
      schemaVersion: 1,
      minAppVersion: '1.0.0',
      contentVersion: '2026-09-23.17',
      locales: ['uk'],
      cards: `cards.${contentHash('x')}.json`,
    });
  });
});
