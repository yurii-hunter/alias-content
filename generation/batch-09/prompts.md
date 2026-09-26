# Рівень 2, люди, транспорт, інструменти, школа, музика: промпти для ChatGPT

20 сіток, 116 карток: 18 по 6 предметів (3×2) і 2 квадратні по 4 (2×2) для високих предметів. Порядок у списку = порядок у сітці (рядками, зліва направо) = `sheets.csv`. Не змінюйте порядок: за ним скрипт нарізки називає картинки.

Сітки називаються `b09-NN`. Стиль — B, як у попередніх. Це остання партія рівня 2.

Тут найбільше предметів, на яких ChatGPT малює букви й цифри: календар, газета, лінійка, рулетка, ваги, компас, марка, листівка, гоночна машина, квиток. В описах уже стоїть «no text / no numbers»; якщо написи все одно з'явилися — перегенеруйте предмет окремо.

Люди — так само, як у `b02-16` і `b03-13/14`: погрудні портрети або на весь зріст, головне — щоб професію було видно з першого погляду.

## Крок 1. Новий чат з еталоном

Почніть **новий чат** і прикріпіть до першого повідомлення 1–2 найвдаліші сітки з попередніх партій (наприклад, `sheet-16.png` і `b02-16.png`).

### b09-01 — вітрильник, таксі, трамвай, підводний човен, скейтборд, парашут

Зберегти як `generation/sheets/b09-01.png`

```
A sprite sheet of 6 separate illustrations for children's word-game cards. The attached images are earlier sheets from the same set: match their style, level of detail, colors and item size exactly.

Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.

Items, in order:
1. sailboat — a sailboat
2. taxi — a yellow taxi
3. tram — a tram
4. submarine — a yellow submarine
5. skateboard — a skateboard
6. parachute — a colorful parachute

Layout: a wide 3:2 image with a grid of 3 columns and 2 rows. Exactly 6 separate items, placed row by row from top-left to bottom-right in the exact order of the list, one item per cell. Each item centered in its cell, filling about 75% of it, fully visible, not touching other items or the image edges. Leave a clear empty gap between neighboring items, including between the top and bottom rows. All items the same visual size regardless of real-world size. Transparent background; if that is not possible, pure flat white. No text, letters, numbers, labels, borders, frames or grid lines. Draw only the listed items.
```

## Крок 2. Решта сіток

Продовжуйте в тому самому чаті, по одному повідомленню на сітку. Якщо стиль почав відрізнятися від еталона — новий чат, знову крок 1, і далі з тієї сітки, на якій зупинилися.

### b09-02 — якір, сміттєвоз, бетономішалка, бульдозер, гоночна машина, кермо

Зберегти як `generation/sheets/b09-02.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. anchor — a ship anchor
2. garbage truck — a green garbage truck
3. cement mixer — a cement mixer truck
4. bulldozer — a yellow bulldozer
5. race car — a red race car, no numbers or letters
6. steering wheel — a car steering wheel
```

### b09-03 — каное, пліт, квиток, компас, самоскид, снігохід

Зберегти як `generation/sheets/b09-03.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. canoe — a red canoe with a paddle
2. raft — a wooden raft
3. ticket — a paper ticket with a star, no text
4. compass — a compass with a red needle, no letters
5. dump truck — a dump truck with sand
6. snowmobile — a snowmobile
```

### b09-04 — паровоз, карета, конус, дорожній знак, дирижабль, триколісний велосипед

Зберегти як `generation/sheets/b09-04.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. steam train — a steam locomotive with smoke
2. carriage — a royal horse-drawn carriage
3. traffic cone — an orange traffic cone
4. road sign — a round red and white road sign on a pole, no text
5. airship — a silver airship
6. tricycle — a kid's tricycle
```

### b09-05 — візок для покупок, весло, поліцейський, будівельник, фермер, художниця

Зберегти як `generation/sheets/b09-05.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. shopping cart — a supermarket shopping cart
2. paddle — a wooden paddle
3. police officer — a male police officer
4. builder — a male builder in a hard hat
5. farmer — a male farmer in overalls with a pitchfork
6. artist — a female artist with a palette and brush
```

### b09-06 — лицар, листоноша, ковбой, балерина, водолаз, моряк

Зберегти як `generation/sheets/b09-06.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. knight — a knight in armor with a shield
2. mail carrier — a male mail carrier with a bag of letters
3. cowboy — a cowboy in a hat
4. ballerina — a ballerina in a tutu
5. diver — a male diver in a mask and flippers
6. sailor — a male sailor in a white cap
```

### b09-07 — водій, супергерой, гном, медсестра, пекар, співачка

Зберегти як `generation/sheets/b09-07.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. driver — a male bus driver at the wheel
2. superhero — a generic superhero kid in a cape and mask
3. gnome — a garden gnome with a red hat
4. nurse — a female nurse in a white uniform
5. baker — a male baker holding bread
6. singer — a female singer with a microphone
```

### b09-08 — футболіст, жонглер, принц, ніндзя, перукарка, садівник

Зберегти як `generation/sheets/b09-08.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. soccer player — a male soccer player kicking a ball
2. juggler — a male juggler with three balls
3. prince — a young prince with a small crown
4. ninja — a friendly kid ninja in a black suit
5. hairdresser — a female hairdresser with scissors and a comb
6. gardener — a male gardener with a watering can
```

### b09-09 — фотограф, вчений, детектив, капітан, офіціант, механік

Зберегти як `generation/sheets/b09-09.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. photographer — a male photographer with a camera
2. scientist — a male scientist in a lab coat with a flask
3. detective — a detective with a hat and a magnifying glass
4. captain — a ship captain with a white cap
5. waiter — a male waiter carrying a tray
6. mechanic — a male mechanic with a wrench
```

### b09-10 — пилка, цвях, викрутка, граблі, тачка, магніт

Зберегти як `generation/sheets/b09-10.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. saw — a hand saw
2. nail — a metal nail
3. screwdriver — a screwdriver
4. rake — a garden rake
5. wheelbarrow — a wheelbarrow
6. magnet — a red horseshoe magnet
```

### b09-11 — мотузка, ваги, цеглина, ящик з інструментами, валик, дриль

Зберегти як `generation/sheets/b09-11.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. rope — a coiled rope
2. scale — a kitchen scale with a round dial, no numbers
3. brick — a red brick
4. toolbox — a red toolbox
5. paint roller — a paint roller
6. drill — an electric drill
```

### b09-12 — рулетка, голка, ланцюг, гачок, сокира, плоскогубці

Зберегти як `generation/sheets/b09-12.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. tape measure — a yellow tape measure, no numbers
2. needle — a sewing needle with thread
3. chain — a metal chain
4. hook — a metal hook
5. axe — a wood axe stuck in a log
6. pliers — a pair of pliers
```

### b09-13 — шуруп, газонокосарка, клей, лінійка, гумка, крейда

Зберегти як `generation/sheets/b09-13.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. screw — a metal screw
2. lawn mower — a red lawn mower
3. glue — a glue stick
4. ruler — a wooden ruler with tick marks, no numbers
5. eraser — an eraser
6. chalk — colored chalk sticks
```

### b09-14 — дошка, карта, точилка, лупа, фломастер, парта

Зберегти як `generation/sheets/b09-14.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. blackboard — a green school blackboard with a chalk drawing of a sun, no letters
2. map — a folded paper map with roads and a red pin
3. sharpener — a pencil sharpener
4. magnifying glass — a magnifying glass
5. marker — a colored marker pen
6. desk — a school desk
```

### b09-15 — мікроскоп, календар, пенал, рахівниця, газета, палітра

Зберегти як `generation/sheets/b09-15.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. microscope — a microscope
2. calendar — a wall calendar with colored squares, no numbers or letters
3. pencil case — a pencil case with pencils
4. abacus — a colorful bead abacus
5. newspaper — a folded newspaper with grey lines instead of text and a small picture
6. palette — a painter's palette with paint blobs
```

### b09-16 — скотч, степлер, скріпка, воскові олівці, папір, марка

Зберегти як `generation/sheets/b09-16.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. tape — a roll of sticky tape
2. stapler — a stapler
3. paper clip — a paper clip
4. crayons — a box of wax crayons, no text
5. paper — a stack of white paper sheets
6. stamp — a postage stamp with a flower picture, no text
```

### b09-17 — листівка, скрипка, сопілка, акордеон, ксилофон, нота

Зберегти як `generation/sheets/b09-17.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. postcard — a postcard with a sunny beach picture, no text
2. violin — a violin with a bow
3. flute — a wooden recorder flute
4. accordion — an accordion
5. xylophone — a rainbow xylophone with mallets
6. music note — a black music note
```

### b09-18 — бубон, маракаси, саксофон, губна гармошка, гонг, платівка

Зберегти як `generation/sheets/b09-18.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. tambourine — a tambourine
2. maracas — a pair of colorful maracas
3. saxophone — a golden saxophone
4. harmonica — a harmonica
5. gong — a round gong with a mallet
6. record — a vinyl record
```

### b09-19 — сім'я, канатна дорога, повітряна куля, підйомний кран

Зберегти як `generation/sheets/b09-19.png`

```
Next sprite sheet. Same style and the same layout rules as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. family — a family of four holding hands
2. cable car — a red cable car cabin hanging on a cable
3. hot air balloon — a striped hot air balloon with a basket
4. crane — a construction crane
```

### b09-20 — мольберт, арфа, віолончель, туба

Зберегти як `generation/sheets/b09-20.png`

```
Next sprite sheet. Same style and the same layout rules as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. easel — a wooden easel with a canvas
2. harp — a golden harp
3. cello — a cello
4. tuba — a big brass tuba
```

## Крок 3. Нарізка

```
npm run split -- generation/batch-09
```

Перевірте `generation/batch-09/review.html`. Злиплі через межу клітинки предмети скрипт розріже сам. Бракований предмет — перегенерувати окремо, зберегти як `generation/sheets/fix-<id>.png` і перезапустити нарізку з `--sheet b09-NN`.
