# Остання партія рівня 1: промпти для ChatGPT

6 сіток, 32 картки: 4 сітки по 6 предметів (3×2) і 2 квадратні сітки 2×2 зі сценами. Порядок у списку = порядок у сітці (рядками, зліва направо) = `sheets.csv`. Не змінюйте порядок: за ним скрипт нарізки називає картинки.

Сітки називаються `b04-NN`. Стиль — B, як у попередніх.

**Сцени** (калюжа, сніг, ліс, річка, море, пляж, феєрверк) малюються як круглі віньєтки: уся сцена всередині кола, як наліпка, а навколо прозоро. Так вони не розповзаються по сітці й ріжуться тим самим скриптом. На картці в грі це буде коло на кремовому тлі.

## Крок 1. Новий чат з еталоном

Почніть **новий чат** і прикріпіть до першого повідомлення 1–2 найвдаліші сітки з попередніх партій (наприклад, `sheet-02.png` і `b03-01.png`).

### b04-01 — будка, черв'як, павутина, морська свинка, риба-клоун, булочка

Зберегти як `generation/sheets/b04-01.png`

```
A sprite sheet of 6 separate illustrations for children's word-game cards. The attached images are earlier sheets from the same set: match their style, level of detail, colors and item size exactly.

Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.

Items, in order:
1. doghouse — a small wooden doghouse with a round door
2. worm — a pink earthworm
3. spiderweb — a round grey spiderweb with a small friendly spider
4. guinea pig — a guinea pig
5. clownfish — an orange and white striped clownfish
6. bun — a round bread bun

Layout: a wide 3:2 image with a grid of 3 columns and 2 rows. Exactly 6 separate items, placed row by row from top-left to bottom-right in the exact order of the list, one item per cell. Each item centered in its cell, filling about 75% of it, fully visible, not touching other items or the image edges. Leave a clear empty gap between neighboring items, including between the top and bottom rows. All items the same visual size regardless of real-world size. Transparent background; if that is not possible, pure flat white. No text, letters, numbers, labels, borders, frames or grid lines. Draw only the listed items.
```

## Крок 2. Решта сіток

Продовжуйте в тому самому чаті, по одному повідомленню на сітку.

### b04-02 — сходи, гребінець, пластир, наліпки, палиця, конверт

Зберегти як `generation/sheets/b04-02.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. stairs — a short wooden staircase with a railing
2. comb — a comb
3. plaster — an adhesive bandage
4. stickers — a sheet of stickers with stars
5. stick — a forked wooden stick with one small leaf
6. envelope — a closed envelope
```

### b04-03 — обличчя, живіт, ковзани, батут, драбина, ліхтарик

Зберегти як `generation/sheets/b04-03.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. face — a smiling child's face
2. belly — a child's round tummy with a belly button, t-shirt lifted up
3. skates — a pair of ice skates
4. trampoline — a round trampoline
5. ladder — a wooden ladder
6. flashlight — a flashlight with a short yellow beam
```

### b04-04 — нитки, міст, паркан, карусель, школа, монета

Зберегти як `generation/sheets/b04-04.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. thread — a spool of thread with a needle
2. bridge — an arched stone bridge
3. fence — a short section of wooden picket fence
4. carousel — a carousel with horses
5. school — a school building with a bell
6. coin — a gold coin
```

## Крок 3. Сцени

Ті самі правила, але квадратна сітка 2×2 і круглі віньєтки. Якщо ChatGPT малює сцену на все поле без кола — попросіть: «Put each scene inside its own circle, transparent outside the circle».

### b04-05 — калюжа, сніг, ліс, річка

Зберегти як `generation/sheets/b04-05.png`

```
Next sprite sheet. Same style as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between them, no text.
Items described as "a round vignette" are small self-contained scenes drawn inside a circle, like a round sticker: everything, including sky, water or ground, stays inside the circle, and outside the circle the background is transparent (or pure flat white). Other items are drawn as usual, without any background.

Items, in order:
1. puddle — a round vignette: a blue puddle with ripples and a falling raindrop on a patch of wet ground
2. snow — a round vignette: a snowy hill with falling snowflakes
3. forest — a round vignette: a few green trees close together on a patch of grass
4. river — a round vignette: a blue river winding between green grassy banks
```

### b04-06 — море, пляж, феєрверк, цирк

Зберегти як `generation/sheets/b04-06.png`

```
Next sprite sheet. Same style as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between them, no text.
Items described as "a round vignette" are small self-contained scenes drawn inside a circle, like a round sticker: everything, including sky, water or ground, stays inside the circle, and outside the circle the background is transparent (or pure flat white). Other items are drawn as usual, without any background.

Items, in order:
1. sea — a round vignette: blue sea waves with a small sailboat
2. beach — a round vignette: yellow sand, a striped beach umbrella and a strip of blue sea
3. fireworks — a round vignette: colorful fireworks bursting in a dark blue night sky
4. circus — a red and white striped circus tent with a flag
```

## Крок 4. Нарізка

```
npm run split -- generation/batch-04
```

Перевірте `generation/batch-04/review.html`. Злиплі через межу клітинки предмети скрипт розріже сам. Бракований предмет — перегенерувати окремо («Draw only item N again, same style, alone on a white background»), зберегти як `generation/sheets/fix-<id>.png` і перезапустити нарізку з `--sheet b04-NN`.
