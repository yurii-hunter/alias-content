# Рівень 2, природа, місця, спорт і казка: промпти для ChatGPT

17 сіток, 94 картки: 13 по 6 предметів (3×2), 1 квадратна на 4 предмети і 3 квадратні сітки зі сценами-віньєтками (по 4). Сітку `b08-18` (театр, аеропорт, місто, бібліотека) прибрано. Порядок у списку = порядок у сітці (рядками, зліва направо) = `sheets.csv`. Не змінюйте порядок: за ним скрипт нарізки називає картинки.

Сітки називаються `b08-NN`. Стиль — B, як у попередніх.

**Сцени** (острів, пустеля, ферма, місто, аеропорт…) — круглі віньєтки, як у `b04-05/06`: уся сцена в колі, навколо прозоро. Будівлі-предмети (маяк, вежа, лікарня, магазин) — без кола й без тла.

На вивісках лікарні, аптеки, магазину, зоопарку ChatGPT любить писати слова. Якщо з'явилися букви — перегенеруйте предмет окремо з «no letters».

## Крок 1. Новий чат з еталоном

Почніть **новий чат** і прикріпіть до першого повідомлення 1–2 найвдаліші сітки з попередніх партій (наприклад, `sheet-06.png` і `b04-05.png` — там є і предмети, і віньєтки).

### b08-01 — жолудь, шишка, кленовий листок, конюшина, паросток, гілка

Зберегти як `generation/sheets/b08-01.png`

```
A sprite sheet of 6 separate illustrations for children's word-game cards. The attached images are earlier sheets from the same set: match their style, level of detail, colors and item size exactly.

Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.

Items, in order:
1. acorn — an acorn with its cap
2. pine cone — a brown pine cone
3. autumn leaf — an orange maple leaf
4. clover — a clover with three leaves
5. sprout — a small green sprout in soil
6. branch — a tree branch with leaves

Layout: a wide 3:2 image with a grid of 3 columns and 2 rows. Exactly 6 separate items, placed row by row from top-left to bottom-right in the exact order of the list, one item per cell. Each item centered in its cell, filling about 75% of it, fully visible, not touching other items or the image edges. Leave a clear empty gap between neighboring items, including between the top and bottom rows. All items the same visual size regardless of real-world size. Transparent background; if that is not possible, pure flat white. No text, letters, numbers, labels, borders, frames or grid lines. Draw only the listed items.
```

## Крок 2. Предмети

Продовжуйте в тому самому чаті, по одному повідомленню на сітку. Якщо стиль почав відрізнятися від еталона — новий чат, знову крок 1, і далі з тієї сітки, на якій зупинилися.

### b08-02 — троянда, тюльпан, мак, лілія, латаття, лаванда

Зберегти як `generation/sheets/b08-02.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. rose — a red rose
2. tulip — a red tulip
3. poppy — a red poppy
4. lily — a white lily
5. water lily — a pink water lily on a leaf
6. lavender — a bunch of purple lavender
```

### b08-03 — букет, вінок, папороть, бамбук, пшениця, кущ

Зберегти як `generation/sheets/b08-03.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. bouquet — a bouquet of flowers
2. wreath — a crown of wildflowers
3. fern — a green fern
4. bamboo — green bamboo stalks
5. wheat — golden ears of wheat
6. bush — a round green bush
```

### b08-04 — дуб, береза, сосна, верба, пеньок, колода

Зберегти як `generation/sheets/b08-04.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. oak — a big oak tree
2. birch — a birch tree with white bark
3. pine — a tall pine tree
4. willow — a weeping willow tree
5. stump — a tree stump
6. log — a wooden log
```

### b08-05 — блискавка, торнадо, бурулька, хвиля, пісок, кристал

Зберегти як `generation/sheets/b08-05.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. lightning — a yellow lightning bolt from a dark cloud
2. tornado — a grey swirling tornado
3. icicle — a row of shining icicles
4. wave — a curling blue sea wave
5. sand — a pile of sand with a toy spade
6. crystal — a purple crystal
```

### b08-06 — діамант, планета, земля, глобус, нло, інопланетянин

Зберегти як `generation/sheets/b08-06.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. diamond — a sparkling diamond
2. planet — a planet with a ring
3. earth — planet Earth as a round globe with blue oceans, green continents and a few white clouds
4. globe — a desk globe on a stand
5. ufo — a flying saucer
6. alien — a friendly green alien
```

### b08-07 — лижі, сноуборд, кубок, ворота, ракетка, шолом

Зберегти як `generation/sheets/b08-07.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. skis — a pair of skis with poles
2. snowboard — a snowboard
3. trophy — a golden trophy cup
4. goal — a football goal with a net
5. racket — a tennis racket
6. helmet — a bike helmet
```

### b08-08 — вудка, мішень, баскетбольний м'яч, ключка, боксерські рукавиці, гантеля

Зберегти як `generation/sheets/b08-08.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. fishing rod — a fishing rod with a hook
2. target — a round target with red rings
3. basketball — an orange basketball
4. hockey stick — a hockey stick and a puck
5. boxing gloves — a pair of red boxing gloves
6. dumbbell — a dumbbell
```

### b08-09 — ласти, спальник, шезлонг, секундомір, рятувальний жилет, шпаківня

Зберегти як `generation/sheets/b08-09.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. flippers — a pair of swimming flippers
2. sleeping bag — a rolled-out sleeping bag
3. deckchair — a striped deckchair
4. stopwatch — a stopwatch
5. life jacket — an orange life jacket
6. birdhouse — a wooden birdhouse on a pole
```

### b08-10 — вежа, маяк, вітряк, іглу, фонтан, хмарочос

Зберегти як `generation/sheets/b08-10.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. tower — a tall stone tower
2. lighthouse — a red and white lighthouse
3. windmill — a windmill with sails
4. igloo — an igloo made of snow blocks
5. fountain — a park fountain
6. skyscraper — a tall skyscraper
```

### b08-11 — піраміда, хатинка, лікарня, магазин, гараж, будиночок на дереві

Зберегти як `generation/sheets/b08-11.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. pyramid — a sandy stone Egyptian pyramid
2. tent hut — a small wooden hut
3. hospital — a hospital building with a red cross, no lettering
4. shop — a small shop with a striped awning, no lettering
5. garage — a garage with a car inside
6. treehouse — a treehouse
```

### b08-12 — стадіон, басейн, аптека, фабрика, чарівник, трон

Зберегти як `generation/sheets/b08-12.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. stadium — a round sports stadium
2. swimming pool — a small swimming pool with blue water and a ladder
3. pharmacy — a small pharmacy with a green cross sign, no lettering
4. factory — a factory with chimneys
5. wizard — a wizard with a pointy hat and a beard
6. throne — a golden throne with red cushion
```

### b08-13 — чарівна паличка, скриня, маска, ліхтар, килим-літак, писанка

Зберегти як `generation/sheets/b08-13.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. magic wand — a magic wand with a star
2. treasure chest — an open treasure chest with coins
3. mask — a carnival mask
4. lantern — a paper lantern
5. flying carpet — a flying carpet
6. easter egg — a painted decorated egg
```

### b08-14 — конфеті, святковий ковпачок, карта скарбів, привид

Зберегти як `generation/sheets/b08-14.png`

```
Next sprite sheet. Same style and the same layout rules as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. confetti — a party popper bursting with colorful confetti
2. party hat — a striped party hat
3. treasure map — an old treasure map with an X
4. ghost — a friendly smiling white ghost
```

## Крок 3. Сцени-віньєтки

Ті самі правила, але кожна сцена — у своєму колі. Якщо ChatGPT малює сцену на все поле — попросіть: «Put each scene inside its own circle, transparent outside the circle».

### b08-15 — острів, водоспад, печера, айсберг

Зберегти як `generation/sheets/b08-15.png`

```
Next sprite sheet. Same style as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between them, no text.
Each item is a round vignette: a small self-contained scene drawn inside a circle, like a round sticker. Everything, including sky, water or ground, stays inside the circle; outside the circle the background is transparent (or pure flat white). All four circles are the same size.

Items, in order:
1. island — a round vignette: a small sandy island with a palm tree in blue sea
2. waterfall — a round vignette: a waterfall pouring over rocks into a pool
3. cave — a round vignette: a dark cave entrance in a grey rock
4. iceberg — a round vignette: a white iceberg floating in blue sea
```

### b08-16 — пустеля, захід сонця, ставок, супутник

Зберегти як `generation/sheets/b08-16.png`

```
Next sprite sheet. Same style as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between them, no text.
Each item is a round vignette: a small self-contained scene drawn inside a circle, like a round sticker. Everything, including sky, water or ground, stays inside the circle; outside the circle the background is transparent (or pure flat white). All four circles are the same size.

Items, in order:
1. desert — a round vignette: sand dunes with a cactus under a hot sun
2. sunset — a round vignette: the orange sun setting over the sea
3. pond — a round vignette: a small blue pond with lily pads and reeds
4. satellite — a round vignette: a satellite with solar panels in dark blue space with stars
```

### b08-17 — зоопарк, ферма, тунель, дитячий майданчик

Зберегти як `generation/sheets/b08-17.png`

```
Next sprite sheet. Same style as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between them, no text.
Each item is a round vignette: a small self-contained scene drawn inside a circle, like a round sticker. Everything, including sky, water or ground, stays inside the circle; outside the circle the background is transparent (or pure flat white). All four circles are the same size.

Items, in order:
1. zoo — a round vignette: a zoo gate with a giraffe and an elephant behind it, no lettering
2. farm — a round vignette: a red barn, a wooden fence and a green field
3. tunnel — a round vignette: a train entering a tunnel in a green mountain
4. playground — a round vignette: a slide and swings on green grass
```

## Крок 4. Нарізка

```
npm run split -- generation/batch-08
```

Перевірте `generation/batch-08/review.html`. Злиплі через межу клітинки предмети скрипт розріже сам. Бракований предмет — перегенерувати окремо, зберегти як `generation/sheets/fix-<id>.png` і перезапустити нарізку з `--sheet b08-NN`.
