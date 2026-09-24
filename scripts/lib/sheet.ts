// Пошук предметів на згенерованій сітці: маска непорожніх пікселів → зв'язні області → клітинки сітки.

export interface Box {
  x0: number;
  y0: number;
  x1: number; // включно
  y1: number; // включно
}

export interface Component extends Box {
  /** Мітка області в `labels` (від 1). */
  id: number;
  area: number;
  cx: number;
  cy: number;
}

/**
 * Маска «тут щось намальовано». Для прозорого фону — альфа, для білого — відстань від білого.
 * `channels` — 4 (RGBA) або 3 (RGB).
 */
export function foregroundMask(data: Uint8Array, width: number, height: number, channels: number): Uint8Array {
  const mask = new Uint8Array(width * height);
  let transparent = 0;
  if (channels === 4) {
    for (let i = 0; i < width * height; i++) if (data[i * 4 + 3] < 16) transparent++;
  }
  // Якщо помітна частина картинки прозора, фон прозорий; інакше вважаємо його білим.
  const useAlpha = channels === 4 && transparent > width * height * 0.1;
  for (let i = 0; i < width * height; i++) {
    const p = i * channels;
    if (useAlpha) {
      mask[i] = data[p + 3] > 40 ? 1 : 0;
    } else {
      const d = Math.max(255 - data[p], 255 - data[p + 1], 255 - data[p + 2]);
      mask[i] = d > 24 ? 1 : 0;
    }
  }
  return mask;
}

/** Зв'язні області маски (8-зв'язність) і карта міток: `labels[y * width + x]` — id області, 0 — фон. */
export function findComponents(mask: Uint8Array, width: number, height: number): { components: Component[]; labels: Int32Array } {
  const label = new Int32Array(width * height);
  const stack = new Int32Array(width * height);
  const result: Component[] = [];
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || label[start]) continue;
    const id = result.length + 1;
    let top = 0;
    stack[top++] = start;
    label[start] = id;
    const c: Component = { id, x0: width, y0: height, x1: -1, y1: -1, area: 0, cx: 0, cy: 0 };
    let sx = 0;
    let sy = 0;
    while (top > 0) {
      const i = stack[--top];
      const x = i % width;
      const y = (i - x) / width;
      c.area++;
      sx += x;
      sy += y;
      if (x < c.x0) c.x0 = x;
      if (x > c.x1) c.x1 = x;
      if (y < c.y0) c.y0 = y;
      if (y > c.y1) c.y1 = y;
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;
          const j = ny * width + nx;
          if (mask[j] && !label[j]) {
            label[j] = id;
            stack[top++] = j;
          }
        }
      }
    }
    c.cx = sx / c.area;
    c.cy = sy / c.area;
    result.push(c);
  }
  return { components: result, labels: label };
}

export interface CellResult {
  box: Box | null;
  /** Області, з яких складається предмет. */
  ids: number[];
  /** Проблеми, через які картинку треба переглянути або перегенерувати. */
  problems: string[];
}

/**
 * Розкладає області по клітинках сітки `cols × rows` за центром мас.
 * Кілька областей в одній клітинці — один предмет (промені сонця, виноградини).
 * Дрібний шум (менше `minArea` пікселів) відкидається.
 */
export function assignToCells(
  components: Component[],
  width: number,
  height: number,
  cols: number,
  rows: number,
  minArea = Math.round(width * height * 0.00005),
): CellResult[] {
  const cellW = width / cols;
  const cellH = height / rows;
  const cells: CellResult[] = Array.from({ length: cols * rows }, () => ({ box: null, ids: [], problems: [] }));
  const mass = new Array(cols * rows).fill(0);

  for (const c of components) {
    if (c.area < minArea) continue;
    const col = Math.min(cols - 1, Math.floor(c.cx / cellW));
    const row = Math.min(rows - 1, Math.floor(c.cy / cellH));
    const index = row * cols + col;
    const cell = cells[index];
    mass[index] += c.area;
    cell.ids.push(c.id);
    cell.box = cell.box
      ? { x0: Math.min(cell.box.x0, c.x0), y0: Math.min(cell.box.y0, c.y0), x1: Math.max(cell.box.x1, c.x1), y1: Math.max(cell.box.y1, c.y1) }
      : { x0: c.x0, y0: c.y0, x1: c.x1, y1: c.y1 };
    // Область помітно більша за клітинку — найімовірніше, два предмети злиплися.
    // Трохи заходити за межу клітинки нормально: модель малює предмети майже на всю клітинку.
    if (c.x1 - c.x0 > cellW * 1.25 || c.y1 - c.y0 > cellH * 1.25) {
      cell.problems.push('предмет більший за клітинку — можливо, злипся з сусіднім');
    }
  }

  const typical = [...mass].sort((a, b) => a - b)[Math.floor(mass.length / 2)];
  cells.forEach((cell, i) => {
    if (!cell.box) {
      cell.problems.push('клітинка порожня');
      return;
    }
    if (mass[i] < typical * 0.2) cell.problems.push('предмет підозріло малий — можливо, його немає або він не в своїй клітинці');
  });
  return cells;
}

/**
 * Вирізає предмет з картинки: лише пікселі його областей і тонка облямівка навколо них
 * (щоб не втратити згладжені краї). Усе інше, зокрема шматки сусідніх предметів, стає прозорим.
 * Повертає RGBA розміром з `box`.
 */
export function cutout(
  data: Uint8Array,
  width: number,
  channels: number,
  labels: Int32Array,
  box: Box,
  ids: number[],
  ring = 3,
): { data: Uint8Array; width: number; height: number } {
  const own = new Set(ids);
  const w = box.x1 - box.x0 + 1;
  const h = box.y1 - box.y0 + 1;
  const keep = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (own.has(labels[(box.y0 + y) * width + box.x0 + x])) keep[y * w + x] = 2;
    }
  }
  // Облямівка: фонові пікселі поруч із предметом (згладжування, напівпрозорі краї).
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (keep[y * w + x] !== 2) continue;
      for (let dy = -ring; dy <= ring; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= h) continue;
        for (let dx = -ring; dx <= ring; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= w || keep[ny * w + nx]) continue;
          if (labels[(box.y0 + ny) * width + box.x0 + nx] === 0) keep[ny * w + nx] = 1;
        }
      }
    }
  }
  const out = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const k = keep[y * w + x];
      if (!k) continue;
      const src = ((box.y0 + y) * width + box.x0 + x) * channels;
      const dst = (y * w + x) * 4;
      out[dst] = data[src];
      out[dst + 1] = data[src + 1];
      out[dst + 2] = data[src + 2];
      if (channels === 4) out[dst + 3] = data[src + 3];
      else {
        // Біле тло: прозорість з того, наскільки піксель відрізняється від білого.
        const d = Math.max(255 - data[src], 255 - data[src + 1], 255 - data[src + 2]);
        out[dst + 3] = k === 2 ? 255 : Math.min(255, d * 8);
      }
    }
  }
  return { data: out, width: w, height: h };
}
