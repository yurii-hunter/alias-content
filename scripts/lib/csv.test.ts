import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { parseCategories, parseSheet } from './csv.ts';

describe('parseSheet', () => {
  it('reads languages from the header and words from the cells', () => {
    const { sheet, errors } = parseSheet('id,tier,preview,category,uk,en\napple,free,,fruit_veg,Яблуко,Apple\ngiraffe,full,yes,wild,Жирафа,\n');
    assert.deepEqual(errors, []);
    assert.deepEqual(sheet.languages, ['uk', 'en']);
    assert.deepEqual(sheet.rows, [
      { line: 2, id: 'apple', tier: 'free', preview: '', category: 'fruit_veg', words: { uk: 'Яблуко', en: 'Apple' } },
      { line: 3, id: 'giraffe', tier: 'full', preview: 'yes', category: 'wild', words: { uk: 'Жирафа' } },
    ]);
  });

  it('trims cells and drops blank words', () => {
    const { sheet } = parseSheet('﻿id,tier,preview,category,uk\n apple , free ,, fruit_veg ,  \n');
    assert.deepEqual(sheet.rows[0], { line: 2, id: 'apple', tier: 'free', preview: '', category: 'fruit_veg', words: {} });
  });

  it('handles quoted cells with commas', () => {
    const { sheet } = parseSheet('id,tier,preview,category,en\nice,free,,food,"ice cream, vanilla"\n');
    assert.equal(sheet.rows[0].words.en, 'ice cream, vanilla');
  });

  it('reports a wrong header', () => {
    const { errors } = parseSheet('id,preview,tier,category,UK\n');
    assert.equal(errors.length, 3);
  });

  it('needs the category column before the languages', () => {
    const { errors } = parseSheet('id,tier,preview,uk\napple,free,,Яблуко\n');
    assert.match(errors[0], /колонка 4 має бути «category»/);
  });
});

describe('parseCategories', () => {
  it('reads id, cover and names by language', () => {
    const { sheet, errors } = parseCategories('id,cover,uk,en\npets,dog,Свійські тварини,Pets\nwild,lion,,Wild animals\n');
    assert.deepEqual(errors, []);
    assert.deepEqual(sheet.languages, ['uk', 'en']);
    assert.deepEqual(sheet.rows, [
      { line: 2, id: 'pets', cover: 'dog', names: { uk: 'Свійські тварини', en: 'Pets' } },
      { line: 3, id: 'wild', cover: 'lion', names: { en: 'Wild animals' } },
    ]);
  });

  it('reports a wrong header', () => {
    assert.match(parseCategories('id,uk,en\n').errors[0], /колонка 2 має бути «cover»/);
  });
});
