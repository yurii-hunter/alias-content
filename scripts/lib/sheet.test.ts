import assert from 'node:assert/strict';
import { test } from 'node:test';

import { assignToCells, cutout, findComponents, foregroundMask } from './sheet.ts';

/** RGBA-картинка width×height з прозорим тлом і непрозорими прямокутниками заданого кольору. */
function image(width: number, height: number, rects: [number, number, number, number, number][]) {
  const data = new Uint8Array(width * height * 4);
  for (const [x0, y0, x1, y1, red] of rects) {
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const p = (y * width + x) * 4;
        data[p] = red;
        data[p + 3] = 255;
      }
    }
  }
  return data;
}

test('два предмети в сітці 2×1 потрапляють у свої клітинки', () => {
  const data = image(200, 100, [
    [10, 10, 80, 90, 200],
    [120, 20, 190, 80, 100],
  ]);
  const { components } = findComponents(foregroundMask(data, 200, 100, 4), 200, 100);
  const cells = assignToCells(components, 200, 100, 2, 1);
  assert.deepEqual(cells[0].box, { x0: 10, y0: 10, x1: 80, y1: 90 });
  assert.deepEqual(cells[1].box, { x0: 120, y0: 20, x1: 190, y1: 80 });
  assert.deepEqual(cells.map((c) => c.problems), [[], []]);
});

test('кілька частин одного предмета (промені сонця) об’єднуються', () => {
  const data = image(200, 100, [
    [20, 20, 60, 60, 200],
    [70, 30, 80, 40, 200],
    [120, 20, 190, 80, 100],
  ]);
  const { components } = findComponents(foregroundMask(data, 200, 100, 4), 200, 100);
  const cells = assignToCells(components, 200, 100, 2, 1, 1);
  assert.deepEqual(cells[0].box, { x0: 20, y0: 20, x1: 80, y1: 60 });
  assert.equal(cells[0].ids.length, 2);
});

test('порожня клітинка — проблема', () => {
  const data = image(200, 100, [[10, 10, 80, 90, 200]]);
  const { components } = findComponents(foregroundMask(data, 200, 100, 4), 200, 100);
  const cells = assignToCells(components, 200, 100, 2, 1);
  assert.deepEqual(cells[1].problems, ['клітинка порожня']);
});

test('шматок сусіда в рамці предмета стає прозорим', () => {
  // Предмет A займає ліву клітинку, а край предмета B заходить у його рамку знизу справа.
  const data = image(200, 100, [
    [10, 10, 90, 60, 200],
    [85, 70, 190, 95, 100],
  ]);
  const { components, labels } = findComponents(foregroundMask(data, 200, 100, 4), 200, 100);
  const cells = assignToCells(components, 200, 100, 2, 1);
  const box = { x0: 10, y0: 10, x1: 95, y1: 95 };
  const cut = cutout(data, 200, 4, labels, box, cells[0].ids, 0);
  const alphaAt = (x: number, y: number) => cut.data[((y - box.y0) * cut.width + (x - box.x0)) * 4 + 3];
  assert.equal(alphaAt(50, 30), 255, 'сам предмет лишається');
  assert.equal(alphaAt(90, 80), 0, 'сусід прибраний');
});

test('біле тло теж розпізнається', () => {
  const width = 100;
  const height = 50;
  const data = new Uint8Array(width * height * 3).fill(255);
  for (let y = 10; y < 40; y++) for (let x = 10; x < 40; x++) data.set([200, 30, 30], (y * width + x) * 3);
  const { components } = findComponents(foregroundMask(data, width, height, 3), width, height);
  assert.equal(components.length, 1);
  assert.deepEqual([components[0].x0, components[0].x1], [10, 39]);
});
