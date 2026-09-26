# Рівень 2, дім та іграшки: промпти для ChatGPT

15 сіток по 6 предметів (3×2), 90 карток. Порядок у списку = порядок у сітці (рядками, зліва направо) = `sheets.csv`. Не змінюйте порядок: за ним скрипт нарізки називає картинки.

Сітки називаються `b06-NN`. Стиль — B, як у попередніх.

Тут багато речей, на яких ChatGPT любить малювати написи й цифри: калькулятор, пульт, клавіатура, будильник, градусник, доміно, кубик. Якщо на картинці з'явилися букви чи цифри-написи (крім крапок на кубику й доміно) — перегенеруйте цей предмет окремо: «Draw only item N again, same style, alone on a white background, no letters or digits».

## Крок 1. Новий чат з еталоном

Почніть **новий чат** і прикріпіть до першого повідомлення 1–2 найвдаліші сітки з попередніх партій (наприклад, `sheet-12.png` і `b03-05.png` — там теж предмети побуту).

### b06-01 — ніж, склянка, духовка, тостер, черпак, качалка

Зберегти як `generation/sheets/b06-01.png`

```
A sprite sheet of 6 separate illustrations for children's word-game cards. The attached images are earlier sheets from the same set: match their style, level of detail, colors and item size exactly.

Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.

Items, in order:
1. knife — a round-tipped table knife
2. glass — an empty drinking glass with a light blue tint
3. oven — a kitchen oven with a glass door
4. toaster — a toaster with two slices of toast popping up
5. ladle — a soup ladle
6. rolling pin — a wooden rolling pin

Layout: a wide 3:2 image with a grid of 3 columns and 2 rows. Exactly 6 separate items, placed row by row from top-left to bottom-right in the exact order of the list, one item per cell. Each item centered in its cell, filling about 75% of it, fully visible, not touching other items or the image edges. Leave a clear empty gap between neighboring items, including between the top and bottom rows. All items the same visual size regardless of real-world size. Transparent background; if that is not possible, pure flat white. No text, letters, numbers, labels, borders, frames or grid lines. Draw only the listed items.
```

## Крок 2. Решта сіток

Продовжуйте в тому самому чаті, по одному повідомленню на сітку. Якщо стиль почав відрізнятися від еталона — новий чат, знову крок 1, і далі з тієї сітки, на якій зупинилися.

### b06-02 — глечик, кришка, таця, друшляк, тертка, вінчик

Зберегти як `generation/sheets/b06-02.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. jug — a clay jug
2. saucepan lid — a pot lid with a knob
3. tray — an empty serving tray
4. colander — a colander with holes
5. grater — a box grater
6. whisk — a kitchen whisk
```

### b06-03 — банка, термос, мікрохвильовка, посудомийна машина, лопатка, ланч-бокс

Зберегти як `generation/sheets/b06-03.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. jar — an empty glass jar with a red lid
2. thermos — a thermos flask
3. microwave — a microwave oven
4. dishwasher — an open dishwasher with plates
5. spatula — a kitchen spatula
6. lunch box — a lunch box with a sandwich
```

### b06-04 — крісло, полиця, килим, штори, табурет, комод

Зберегти як `generation/sheets/b06-04.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. armchair — a soft armchair
2. shelf — a bookshelf with books
3. rug — a patterned rug
4. curtains — a pair of window curtains on a rod
5. stool — a wooden stool
6. chest of drawers — a chest of drawers
```

### b06-05 — ваза, картина, камін, вазон, люстра, рамка

Зберегти як `generation/sheets/b06-05.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. vase — a vase with flowers
2. painting — a framed painting of a mountain landscape
3. fireplace — a fireplace with fire
4. flowerpot — a potted plant
5. chandelier — a ceiling chandelier
6. photo frame — an empty photo frame
```

### b06-06 — дах, розетка, ліфт, поштова скринька, кондиціонер, вентилятор

Зберегти як `generation/sheets/b06-06.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. roof — a red tiled triangular roof
2. socket — a white wall power socket
3. elevator — an elevator with open doors
4. mailbox — a mailbox
5. air conditioner — a wall air conditioner
6. fan — an electric fan
```

### b06-07 — зубна паста, душ, кран, раковина, шампунь, фен

Зберегти як `generation/sheets/b06-07.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. toothpaste — a tube of toothpaste
2. shower — a shower head with water
3. tap — a water tap with a drop
4. sink — a bathroom sink with a tap
5. shampoo — a shampoo bottle
6. hair dryer — a hair dryer
```

### b06-08 — праска, вішалка, швабра, совок, прищіпка, халат

Зберегти як `generation/sheets/b06-08.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. iron — a clothes iron
2. hanger — a clothes hanger
3. mop — a floor mop
4. dustpan — a dustpan with a small brush
5. clothespin — a wooden clothespin
6. bathrobe — a fluffy bathrobe
```

### b06-09 — колиска, підгузок, пляшечка, слинявчик, двоповерхове ліжко, щітка для волосся

Зберегти як `generation/sheets/b06-09.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. cradle — a wooden baby cradle
2. diaper — a baby diaper
3. baby bottle — a baby bottle with milk
4. bib — a baby bib
5. bunk bed — a bunk bed
6. hairbrush — a hairbrush
```

### b06-10 — градусник, аптечка, стетоскоп, будильник, пісочний годинник, клітка

Зберегти як `generation/sheets/b06-10.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. thermometer — a digital fever thermometer
2. first aid kit — a first aid kit with a cross
3. stethoscope — a stethoscope
4. alarm clock — an alarm clock with two bells
5. hourglass — an hourglass with sand
6. birdcage — an empty round birdcage
```

### b06-11 — батарейка, мікрофон, ноутбук, пульт, планшет, радіо

Зберегти як `generation/sheets/b06-11.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. battery — an AA battery
2. microphone — a microphone
3. laptop — an open laptop
4. remote — a TV remote control
5. tablet — a tablet computer
6. radio — an old radio with an antenna
```

### b06-12 — дрон, калькулятор, принтер, клавіатура, колонка, телескоп

Зберегти як `generation/sheets/b06-12.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. drone — a small drone with four propellers
2. calculator — a calculator
3. printer — a printer with a sheet of paper
4. keyboard — a computer keyboard
5. speaker — a music speaker
6. telescope — a telescope on a tripod
```

### b06-13 — віяло, бочка, банка фарби, йо-йо, дзиґа, обруч

Зберегти як `generation/sheets/b06-13.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. folding fan — an open folding hand fan
2. barrel — a wooden barrel
3. paint can — an open can of blue paint
4. yo yo — a yo-yo on a string
5. spinning top — a colorful spinning top
6. hoop — a colorful hula hoop
```

### b06-14 — кеглі, пірамідка, конячка-гойдалка, ляльковий будиночок, гральний кубик, брязкальце

Зберегти як `generation/sheets/b06-14.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. skittles — bowling pins and a ball
2. pyramid toy — a colorful ring-stacking toy
3. rocking horse — a wooden rocking horse
4. dollhouse — a dollhouse
5. dice — a white dice with dots
6. rattle — a baby rattle
```

### b06-15 — паперовий кораблик, клубок, калейдоскоп, шахи, доміно, розмальовка

Зберегти як `generation/sheets/b06-15.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. paper boat — a folded paper boat
2. ball of yarn — a ball of red yarn
3. kaleidoscope — a kaleidoscope tube
4. chess — a chessboard with pieces
5. dominoes — a row of domino tiles
6. coloring book — an open coloring book with crayons
```

## Крок 3. Нарізка

```
npm run split -- generation/batch-06
```

Перевірте `generation/batch-06/review.html`. Злиплі через межу клітинки предмети скрипт розріже сам. Бракований предмет — перегенерувати окремо, зберегти як `generation/sheets/fix-<id>.png` і перезапустити нарізку з `--sheet b06-NN`.
