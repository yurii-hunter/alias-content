import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { parseSheet } from './csv.ts';

describe('parseSheet', () => {
  it('reads languages from the header and words from the cells', () => {
    const { sheet, errors } = parseSheet('id,tier,preview,uk,en\napple,free,,Яблуко,Apple\ngiraffe,full,yes,Жирафа,\n');
    assert.deepEqual(errors, []);
    assert.deepEqual(sheet.languages, ['uk', 'en']);
    assert.deepEqual(sheet.rows, [
      { line: 2, id: 'apple', tier: 'free', preview: '', words: { uk: 'Яблуко', en: 'Apple' } },
      { line: 3, id: 'giraffe', tier: 'full', preview: 'yes', words: { uk: 'Жирафа' } },
    ]);
  });

  it('trims cells and drops blank words', () => {
    const { sheet } = parseSheet('﻿id,tier,preview,uk\n apple , free ,,  \n');
    assert.deepEqual(sheet.rows[0], { line: 2, id: 'apple', tier: 'free', preview: '', words: {} });
  });

  it('handles quoted cells with commas', () => {
    const { sheet } = parseSheet('id,tier,preview,en\nice,free,,"ice cream, vanilla"\n');
    assert.equal(sheet.rows[0].words.en, 'ice cream, vanilla');
  });

  it('reports a wrong header', () => {
    const { errors } = parseSheet('id,preview,tier,UK\n');
    assert.equal(errors.length, 3);
  });
});
