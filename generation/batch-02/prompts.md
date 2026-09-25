# Друга сотня карток: промпти для ChatGPT

17 сіток: 16 по 6 предметів (3×2) і остання на 4 (2×2). Порядок у списку = порядок у сітці (рядками, зліва направо) = `sheets.csv`. Не змінюйте порядок: за ним скрипт нарізки називає картинки.

Сітки цієї партії називаються `b02-NN`, щоб не перезаписати `sheet-NN` з першої сотні. Стиль — B, як у першій сотні.

## Крок 1. Новий чат з еталоном

Почніть **новий чат**: старий уже довгий, і стиль у ньому може пливти. Прикріпіть до першого повідомлення 1–2 найвдаліші сітки з першої сотні (наприклад, `sheet-02.png` і `sheet-07.png`) — це еталон стилю й масштабу.

### b02-01 — коза, півень, курча, віслюк, хом'як, папуга

Зберегти як `generation/sheets/b02-01.png`

```
A sprite sheet of 6 separate illustrations for children's word-game cards. The attached images are earlier sheets from the same set: match their style, level of detail, colors and item size exactly.

Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.

Items, in order:
1. goat — a white goat with small horns and a beard
2. rooster — a rooster with a big red comb and colorful tail
3. chick — a small fluffy yellow chick
4. donkey — a grey donkey with long ears
5. hamster — a round ginger hamster
6. parrot — a bright green and red parrot

Layout: a wide 3:2 image with a grid of 3 columns and 2 rows. Exactly 6 separate items, placed row by row from top-left to bottom-right in the exact order of the list, one item per cell. Each item centered in its cell, filling about 75% of it, fully visible, not touching other items or the image edges. All items the same visual size regardless of real-world size. Transparent background; if that is not possible, pure flat white. No text, letters, numbers, labels, borders, frames or grid lines. Draw only the listed items.
```

## Крок 2. Решта сіток

Продовжуйте в тому самому чаті, по одному повідомленню на сітку. Якщо стиль почав відрізнятися від еталона — новий чат, знову крок 1 з тими ж вкладеннями, і далі з тієї сітки, на якій зупинилися.

### b02-02 — слон, жирафа, крокодил, бегемот, кенгуру, панда

Зберегти як `generation/sheets/b02-02.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. elephant — a grey elephant with a trunk
2. giraffe — a tall giraffe with spots
3. crocodile — a green crocodile with teeth showing, friendly
4. hippo — a round purple-grey hippo
5. kangaroo — a kangaroo standing on its hind legs
6. panda — a black and white panda sitting
```

### b02-03 — верблюд, олень, змія, динозавр, пташка, фламінго

Зберегти як `generation/sheets/b02-03.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. camel — a camel with two humps
2. deer — a deer with antlers
3. snake — a green snake curled up, friendly
4. dinosaur — a friendly green long-necked dinosaur
5. bird — a small blue bird sitting
6. flamingo — a pink flamingo standing on one leg
```

### b02-04 — дельфін, акула, восьминіг, краб, павук, гусениця

Зберегти як `generation/sheets/b02-04.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. dolphin — a grey dolphin jumping
2. shark — a grey shark, friendly
3. octopus — a purple octopus with eight arms
4. crab — a red crab with claws
5. spider — a small friendly black spider
6. caterpillar — a green caterpillar
```

### b02-05 — лимон, вишня, персик, ананас, картопля, цибуля

Зберегти як `generation/sheets/b02-05.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. lemon — a yellow lemon
2. cherry — two red cherries on stems
3. peach — a round peach with a leaf
4. pineapple — a pineapple with green leaves
5. potato — a brown potato
6. onion — a golden onion
```

### b02-06 — капуста, суп, бутерброд, макарони, млинці, печиво

Зберегти як `generation/sheets/b02-06.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. cabbage — a green head of cabbage
2. soup — a bowl of hot soup
3. sandwich — a sandwich with cheese and lettuce
4. pasta — a plate of spaghetti
5. pancake — a stack of pancakes
6. cookie — a round cookie with chocolate chips
```

### b02-07 — шоколад, льодяник, сік, виделка, каструля, чайник

Зберегти як `generation/sheets/b02-07.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. chocolate — a chocolate bar, partly unwrapped
2. lollipop — a round swirl lollipop
3. juice — a glass of orange juice with a straw
4. fork — a metal fork
5. pot — a cooking pot with a lid
6. kettle — a stovetop kettle with a spout
```

### b02-08 — холодильник, диван, подушка, свічка, коробка, рушник

Зберегти як `generation/sheets/b02-08.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. fridge — a white fridge
2. sofa — a blue sofa
3. pillow — a white pillow
4. candle — a lit candle
5. box — a closed cardboard box
6. towel — a folded towel
```

### b02-09 — ванна, віник, відро, комп'ютер, фотоапарат, ножиці

Зберегти як `generation/sheets/b02-09.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. bathtub — a bathtub with bubbles
2. broom — a broom
3. bucket — a bucket with a handle
4. computer — a desktop computer with a monitor and keyboard
5. camera — a photo camera
6. scissors — a pair of kids' scissors
```

### b02-10 — кепка, шарф, рукавиці, куртка, сукня, футболка

Зберегти як `generation/sheets/b02-10.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. cap — a baseball cap
2. scarf — a striped knitted scarf
3. mittens — a pair of knitted mittens
4. jacket — a zip-up jacket
5. dress — a girl's dress
6. t shirt — a t-shirt
```

### b02-11 — штани, кросівки, кубики, гойдалка, гірка, самокат

Зберегти як `generation/sheets/b02-11.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. trousers — a pair of trousers
2. sneakers — a pair of sneakers
3. blocks — a stack of colorful toy blocks
4. swing — a playground swing
5. slide — a playground slide
6. scooter — a kick scooter
```

### b02-12 — санки, іграшкова машинка, човен, мотоцикл, вантажівка, гелікоптер

Зберегти як `generation/sheets/b02-12.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. sled — a wooden sled
2. toy car — a small red toy car
3. boat — a small rowing boat with oars
4. motorcycle — a motorcycle
5. truck — a delivery truck
6. helicopter — a helicopter
```

### b02-13 — швидка допомога, пожежна машина, поліцейська машина, сніжинка, гора, вогонь

Зберегти як `generation/sheets/b02-13.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. ambulance — a white ambulance with a red cross, no lettering
2. fire truck — a red fire truck with a ladder
3. police car — a blue and white police car with a siren light, no lettering
4. snowflake — a blue snowflake
5. mountain — a mountain with a snowy top
6. fire — a campfire with flames
```

### b02-14 — листок, соняшник, кактус, око, ніс, рот

Зберегти як `generation/sheets/b02-14.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. leaf — a green leaf
2. sunflower — a sunflower
3. cactus — a cactus in a pot
4. eye — a single eye with eyelashes, no face
5. nose — a cartoon human nose, no face
6. mouth — smiling lips, no face
```

### b02-15 — вухо, зуб, піаніно, футбольний м'яч, молоток, малюк

Зберегти як `generation/sheets/b02-15.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. ear — a human ear, no face
2. tooth — a white tooth, smiling
3. piano — an upright piano
4. soccer ball — a black and white soccer ball
5. hammer — a hammer
6. baby — a baby with a pacifier
```

### b02-16 — хлопчик, дівчинка, бабуся, дідусь, лікарка, пожежник

Зберегти як `generation/sheets/b02-16.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, transparent or white background, no text.

Items, in order:
1. boy — a smiling boy
2. girl — a smiling girl
3. grandma — a smiling grandmother with glasses
4. grandpa — a smiling grandfather with a mustache
5. doctor — a female doctor with a stethoscope
6. firefighter — a male firefighter in a helmet
```

### b02-17 — замок, робот, дракон, єдиноріг

Зберегти як `generation/sheets/b02-17.png`

```
Next sprite sheet. Same style and the same layout rules as before: 4 items in the exact order, one per cell, same size, transparent or white background, no text. This time a square image with a 2×2 grid.

Items, in order:
1. castle — a castle with towers
2. robot — a friendly robot
3. dragon — a friendly green dragon
4. unicorn — a white unicorn with a golden horn
```

## Крок 3. Нарізка

```
npm run split -- generation/batch-02
```

Перевірте `generation/batch-02/review.html`. Бракований предмет — перегенерувати окремо («Draw only item N again, same style, alone on a white background»), зберегти як `generation/sheets/fix-<id>.png` і перезапустити нарізку з `--sheet b02-NN`.
