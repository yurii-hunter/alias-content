import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { checkAppV1 } from './compat-v1.ts';
import { buildCardsFile, buildManifest } from './output.ts';

const manifest = (extra: object = {}) => ({ ...buildManifest(['uk', 'en'], 'cards.abcd1234.json', '2026-10-10.1'), ...extra });
const cardsFile = () =>
  JSON.parse(
    JSON.stringify(
      buildCardsFile(
        [
          { id: 'dog', tier: 'free', preview: false, category: 'pets', words: { uk: 'Собака', en: 'Dog' } },
          { id: 'lion', tier: 'full', preview: true, category: 'wild', words: { uk: 'Лев', en: 'Lion' } },
        ],
        ['uk', 'en'],
        new Map([
          ['dog', 'img/dog.aecdac49.webp'],
          ['lion', 'img/lion.464340f0.webp'],
        ]),
        [{ id: 'pets', cover: 'dog', names: { en: 'Pets' } }],
      ),
    ),
  );

describe('checkAppV1', () => {
  it('accepts what the build writes today, categories included', () => {
    assert.deepEqual(checkAppV1(manifest(), cardsFile()), []);
  });

  it('accepts new fields the old app ignores', () => {
    const file = cardsFile();
    file.cards[0].someFutureField = { nested: true };
    file.somethingNew = [1, 2, 3];
    assert.deepEqual(checkAppV1(manifest({ extra: 'x' }), file), []);
  });

  it('rejects a new value in an existing enum, which drops the whole file for 1.0.0', () => {
    const file = cardsFile();
    file.cards[1].tier = 'premium';
    assert.match(checkAppV1(manifest(), file)[0], /відкидає файл карток \(перша погана картка — №2\)/);
  });

  it('rejects a changed image path or a non-string word', () => {
    const file = cardsFile();
    file.cards[0].image = 'images/dog.png';
    assert.equal(checkAppV1(manifest(), file).length, 1);
    const words = cardsFile();
    words.cards[0].words.de = 3;
    assert.equal(checkAppV1(manifest(), words).length, 1);
  });

  it('rejects a schema bump or a minAppVersion above 1.0.0', () => {
    assert.match(checkAppV1(manifest({ schemaVersion: 2 }), cardsFile())[0], /schemaVersion 2/);
    assert.match(checkAppV1(manifest({ minAppVersion: '1.1.0' }), cardsFile())[0], /відрізає версію 1.0.0/);
    assert.deepEqual(checkAppV1(manifest({ minAppVersion: '1.0' }), cardsFile()), []);
  });
});
