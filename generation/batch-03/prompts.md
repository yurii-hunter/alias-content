# Третя сотня карток: промпти для ChatGPT

17 сіток: 16 по 6 предметів (3×2) і остання на 4 (2×2). Порядок у списку = порядок у сітці (рядками, зліва направо) = `sheets.csv`. Не змінюйте порядок: за ним скрипт нарізки називає картинки.

Сітки цієї партії називаються `b03-NN`. Стиль — B, як у попередніх. Нове в промптах: явна вимога порожнього проміжку між предметами, щоб вони не злипалися, як бабуся з пожежником.

## Крок 1. Новий чат з еталоном

Почніть **новий чат** і прикріпіть до першого повідомлення 1–2 найвдаліші сітки з попередніх партій (наприклад, `sheet-02.png` і `b02-16.png`) — це еталон стилю й масштабу.

### b03-01 — цуценя, кошеня, поні, білий ведмідь, лебідь, павич

Зберегти як `generation/sheets/b03-01.png`

```
A sprite sheet of 6 separate illustrations for children's word-game cards. The attached images are earlier sheets from the same set: match their style, level of detail, colors and item size exactly.

Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.

Items, in order:
1. puppy — a small puppy with floppy ears
2. kitten — a tiny kitten playing with a ball of yarn
3. pony — a small pony with a colorful mane
4. polar bear — a white polar bear
5. swan — a white swan swimming
6. peacock — a peacock with an open colorful tail

Layout: a wide 3:2 image with a grid of 3 columns and 2 rows. Exactly 6 separate items, placed row by row from top-left to bottom-right in the exact order of the list, one item per cell. Each item centered in its cell, filling about 75% of it, fully visible, not touching other items or the image edges. Leave a clear empty gap between neighboring items, including between the top and bottom rows. All items the same visual size regardless of real-world size. Transparent background; if that is not possible, pure flat white. No text, letters, numbers, labels, borders, frames or grid lines. Draw only the listed items.
```

## Крок 2. Решта сіток

Продовжуйте в тому самому чаті, по одному повідомленню на сітку. Якщо стиль почав відрізнятися від еталона — новий чат, знову крок 1 з тими ж вкладеннями, і далі з тієї сітки, на якій зупинилися.

### b03-02 — голуб, гніздо, перо, морська зірка, мушля, мураха

Зберегти як `generation/sheets/b03-02.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. pigeon — a grey pigeon
2. nest — a bird nest with three eggs
3. feather — a single colorful feather
4. starfish — an orange starfish
5. seashell — a spiral seashell
6. ant — a black ant
```

### b03-03 — жук, малина, мандарин, перець, горох, броколі

Зберегти як `generation/sheets/b03-03.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. beetle — a shiny green beetle
2. raspberry — a red raspberry
3. tangerine — a small peeled tangerine with segments
4. bell pepper — a red bell pepper
5. peas — an open green pea pod with peas
6. broccoli — a green broccoli floret
```

### b03-04 — сосиска, гамбургер, мед, пончик, попкорн, картопля фрі

Зберегти як `generation/sheets/b03-04.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. sausage — a sausage on a fork
2. hamburger — a hamburger
3. honey — a jar of honey with a dipper
4. donut — a pink glazed donut with sprinkles
5. popcorn — a striped box of popcorn
6. fries — french fries in a red box
```

### b03-05 — пляшка, сковорідка, миска, кошик, шафа, лампочка

Зберегти як `generation/sheets/b03-05.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. bottle — a plastic water bottle
2. frying pan — a frying pan
3. bowl — an empty bowl
4. basket — a woven basket with a handle
5. wardrobe — a wooden wardrobe with two doors
6. light bulb — a light bulb with a warm yellow glow inside
```

### b03-06 — дзеркало, ковдра, лавка, унітаз, пилосос, пральна машина

Зберегти як `generation/sheets/b03-06.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. mirror — an oval mirror
2. blanket — a folded checked blanket
3. bench — a park bench
4. toilet — a white toilet
5. vacuum — a vacuum cleaner
6. washing machine — a washing machine
```

### b03-07 — гумова качечка, навушники, туалетний папір, смітник, соска, губка

Зберегти як `generation/sheets/b03-07.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. rubber duck — a yellow rubber duck
2. headphones — over-ear headphones
3. toilet paper — a roll of toilet paper
4. trash can — a trash can with a lid
5. pacifier — a baby pacifier
6. sponge — a yellow sponge
```

### b03-08 — спідниця, светр, шорти, піжама, капці, сумка

Зберегти як `generation/sheets/b03-08.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. skirt — a pleated skirt
2. sweater — a knitted sweater
3. shorts — a pair of shorts
4. pajamas — a pajama top and bottoms with stars
5. slippers — a pair of fluffy slippers
6. bag — a handbag
```

### b03-09 — бантик, ґудзик, пазл, скакалка, пісочниця, мильні бульбашки

Зберегти як `generation/sheets/b03-09.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. bow — a pink ribbon bow
2. button — a round button with four holes
3. puzzle — a few jigsaw puzzle pieces
4. jump rope — a jump rope with handles
5. sandbox — a sandbox with a bucket and spade
6. bubbles — soap bubbles and a bubble wand
```

### b03-10 — паперовий літачок, пісочний замок, сніжка, пластилін, екскаватор, світлофор

Зберегти як `generation/sheets/b03-10.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. paper plane — a paper airplane
2. sandcastle — a sandcastle with a flag
3. snowball — a round snowball with light blue shading
4. play dough — colorful modeling clay sticks
5. excavator — a yellow excavator
6. traffic light — a traffic light
```

### b03-11 — колесо, візочок, дощ, вулкан, кульбаба, пальма

Зберегти як `generation/sheets/b03-11.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. wheel — a black car tire with a silver rim
2. stroller — a baby stroller
3. rain — a grey cloud with raindrops
4. volcano — a volcano erupting
5. dandelion — a yellow dandelion flower
6. palm tree — a palm tree with coconuts
```

### b03-12 — трава, ромашка, камінь, нога, палець, кістка

Зберегти як `generation/sheets/b03-12.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. grass — a tuft of green grass
2. daisy — a white daisy with a yellow center
3. stone — a grey stone
4. leg — a child's leg with a sock and shoe
5. finger — a hand pointing with one finger
6. bone — a dog bone
```

### b03-13 — кухар, вчителька, космонавт, клоун, король, королева

Зберегти як `generation/sheets/b03-13.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. chef — a male chef in a white hat
2. teacher — a female teacher holding a book and a pointer
3. astronaut — an astronaut in a spacesuit
4. clown — a friendly clown with a red nose
5. king — a king with a crown
6. queen — a queen with a crown
```

### b03-14 — принцеса, пірат, мама, тато, русалка, фея

Зберегти як `generation/sheets/b03-14.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. princess — a princess in a pink dress
2. pirate — a friendly pirate with an eye patch
3. mom — a mother hugging a small child
4. dad — a father carrying a child on his shoulders
5. mermaid — a mermaid with a green tail
6. fairy — a small fairy with wings and a wand
```

### b03-15 — ручка, зошит, пензлик, фарби, дзвоник, труба

Зберегти як `generation/sheets/b03-15.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. pen — a pen
2. notebook — a school notebook
3. paintbrush — a paintbrush with paint on the tip
4. paints — a watercolor paint box
5. bell — a golden bell
6. trumpet — a golden trumpet
```

### b03-16 — медаль, намет, свисток, прапорець, надувне коло, бінокль

Зберегти як `generation/sheets/b03-16.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. medal — a gold medal on a ribbon
2. tent — a camping tent
3. whistle — a whistle on a cord
4. flag — a red flag on a pole
5. swimming ring — an inflatable swim ring
6. binoculars — a pair of binoculars
```

### b03-17 — лопата, лійка, корона, ялинка

Зберегти як `generation/sheets/b03-17.png`

```
Next sprite sheet. Same style and the same layout rules as before: 4 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text. This time a square image with a 2×2 grid.

Items, in order:
1. shovel — a shovel
2. watering can — a green watering can
3. crown — a golden crown
4. christmas tree — a decorated Christmas tree
```

## Крок 3. Нарізка

```
npm run split -- generation/batch-03
```

Перевірте `generation/batch-03/review.html`. Злиплі через межу клітинки предмети скрипт розріже сам (позначка «розрізано автоматично»). Бракований предмет — перегенерувати окремо («Draw only item N again, same style, alone on a white background»), зберегти як `generation/sheets/fix-<id>.png` і перезапустити нарізку з `--sheet b03-NN`.
