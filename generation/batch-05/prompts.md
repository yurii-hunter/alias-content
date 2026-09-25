# Рівень 2, тварини й тіло: промпти для ChatGPT

18 сіток, 104 картки: 16 по 6 предметів (3×2) і 2 квадратні по 4 (2×2). Порядок у списку = порядок у сітці (рядками, зліва направо) = `sheets.csv`. Не змінюйте порядок: за ним скрипт нарізки називає картинки.

Сітки називаються `b05-NN`. Стиль — B, як у попередніх.

Тут багато схожих тварин (лось/олень, гепард/леопард, чапля/лелека, оса/бджола/джміль). Під час перевірки дивіться, щоб кожну можна було впізнати за головною ознакою з опису: плоскі роги лося, плями-кружечки леопарда проти крапок гепарда, червоний дзьоб лелеки тощо. Якщо дві вийшли однаковими — перегенеруйте одну окремо.

## Крок 1. Новий чат з еталоном

Почніть **новий чат** і прикріпіть до першого повідомлення 1–2 найвдаліші сітки з попередніх партій (наприклад, `sheet-02.png` і `b03-01.png`).

### b05-01 — гуска, індик, бик, ягня, лама, сіно

Зберегти як `generation/sheets/b05-01.png`

```
A sprite sheet of 6 separate illustrations for children's word-game cards. The attached images are earlier sheets from the same set: match their style, level of detail, colors and item size exactly.

Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.

Items, in order:
1. goose — a white goose with a long neck
2. turkey — a turkey with a fanned tail
3. bull — a brown bull with horns
4. lamb — a small white lamb
5. llama — a fluffy white llama
6. hay — a round bale of hay

Layout: a wide 3:2 image with a grid of 3 columns and 2 rows. Exactly 6 separate items, placed row by row from top-left to bottom-right in the exact order of the list, one item per cell. Each item centered in its cell, filling about 75% of it, fully visible, not touching other items or the image edges. Leave a clear empty gap between neighboring items, including between the top and bottom rows. All items the same visual size regardless of real-world size. Transparent background; if that is not possible, pure flat white. No text, letters, numbers, labels, borders, frames or grid lines. Draw only the listed items.
```

## Крок 2. Решта сіток

Продовжуйте в тому самому чаті, по одному повідомленню на сітку. Якщо стиль почав відрізнятися від еталона — новий чат, знову крок 1, і далі з тієї сітки, на якій зупинилися.

### b05-02 — сарай, підкова, вулик, золота рибка, щур, канарка

Зберегти як `generation/sheets/b05-02.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. barn — a red farm barn
2. horseshoe — a single metal horseshoe
3. beehive — a wooden beehive box with bees
4. goldfish — an orange goldfish in a round bowl
5. rat — a grey rat with a long tail, friendly
6. canary — a yellow canary
```

### b05-03 — лось, кабан, бобер, єнот, кріт, кажан

Зберегти як `generation/sheets/b05-03.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. moose — a moose with wide flat antlers
2. boar — a wild boar with tusks
3. beaver — a beaver with a flat tail and big front teeth
4. raccoon — a raccoon with a striped tail and a black mask
5. mole — a dark mole peeking out of a mound of soil
6. bat — a small friendly bat with open wings
```

### b05-04 — рись, зубр, борсук, дикобраз, бурундук, заєць

Зберегти як `generation/sheets/b05-04.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. lynx — a lynx with tufted ears
2. bison — a big brown bison with a shaggy mane
3. badger — a badger with a striped face
4. porcupine — a porcupine with long quills
5. chipmunk — a chipmunk with stripes on its back
6. hare — a brown hare running
```

### b05-05 — носоріг, коала, леопард, горила, лінивець, гепард

Зберегти як `generation/sheets/b05-05.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. rhino — a grey rhino with a horn on its nose
2. koala — a grey koala hugging a branch
3. leopard — a yellow leopard with black spots
4. gorilla — a big black gorilla sitting
5. sloth — a sloth hanging from a branch
6. cheetah — a cheetah running
```

### b05-06 — орангутан, лемур, гієна, буйвол, антилопа, сурикат

Зберегти як `generation/sheets/b05-06.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. orangutan — an orange orangutan
2. lemur — a lemur with a striped tail
3. hyena — a spotted hyena
4. buffalo — a water buffalo with curved horns
5. antelope — an antelope with long horns
6. meerkat — a meerkat standing upright
```

### b05-07 — качкодзьоб, броненосець, мурахоїд, скунс, ящірка, хамелеон

Зберегти як `generation/sheets/b05-07.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. platypus — a platypus with a duck bill
2. armadillo — an armadillo with a banded shell
3. anteater — an anteater with a long snout
4. skunk — a black skunk with a white stripe
5. lizard — a small green lizard
6. chameleon — a green chameleon with a curled tail
```

### b05-08 — ігуана, північний олень, мамонт, тюлень, морж, видра

Зберегти як `generation/sheets/b05-08.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. iguana — a green iguana
2. reindeer — a reindeer with big antlers
3. mammoth — a woolly mammoth with curved tusks
4. seal — a grey seal lying down
5. walrus — a brown walrus with long tusks
6. otter — a brown otter floating on its back
```

### b05-09 — орел, горобець, ворона, лелека, страус, дятел

Зберегти як `generation/sheets/b05-09.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. eagle — a brown eagle with a white head
2. sparrow — a small brown sparrow
3. crow — a black crow
4. stork — a white stork with a red beak and long legs
5. ostrich — an ostrich with a long neck
6. woodpecker — a woodpecker with a red cap on a tree trunk
```

### b05-10 — чайка, тукан, чапля, пелікан, сорока, зозуля

Зберегти як `generation/sheets/b05-10.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. seagull — a white seagull
2. toucan — a black toucan with a big orange beak
3. heron — a grey heron with long legs
4. pelican — a white pelican with a big beak pouch
5. magpie — a black and white magpie with a long tail
6. cuckoo — a grey cuckoo bird
```

### b05-11 — колібрі, снігур, ластівка, синиця, какаду, шкаралупа

Зберегти як `generation/sheets/b05-11.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. hummingbird — a hummingbird near a flower
2. bullfinch — a bullfinch with a red chest on a snowy branch
3. swallow — a swallow with a forked tail flying
4. tit — a yellow-breasted great tit on a branch
5. cockatoo — a white cockatoo with a yellow crest
6. eggshell — a cracked eggshell
```

### b05-12 — медуза, морський коник, креветка, корал, кальмар, омар

Зберегти як `generation/sheets/b05-12.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. jellyfish — a pink jellyfish
2. seahorse — a yellow seahorse
3. shrimp — a pink shrimp
4. coral — a branch of red coral
5. squid — a pink squid with long tentacles
6. lobster — a red lobster
```

### b05-13 — морський їжак, косатка, скат, риба-їжак, риба-меч, нарвал

Зберегти як `generation/sheets/b05-13.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. sea urchin — a spiky purple sea urchin
2. orca — a black and white orca
3. stingray — a grey stingray seen from above
4. pufferfish — a round spiky pufferfish
5. swordfish — a swordfish with a long pointed nose
6. narwhal — a narwhal with a long tusk
```

### b05-14 — водорості, перлина, акваріум, пуголовок, мурашник, скорпіон

Зберегти як `generation/sheets/b05-14.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. seaweed — a tall strand of green seaweed
2. pearl — a white pearl in an open shell
3. aquarium — a rectangular aquarium with fish and plants
4. tadpole — a black tadpole swimming
5. anthill — an anthill with ants
6. scorpion — a friendly cartoon scorpion
```

### b05-15 — бабка, коник, муха, комар, джміль, світлячок

Зберегти як `generation/sheets/b05-15.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. dragonfly — a blue dragonfly with four wings
2. grasshopper — a green grasshopper
3. fly — a housefly with transparent wings
4. mosquito — a mosquito with long legs
5. bumblebee — a fuzzy round bumblebee
6. firefly — a firefly with a glowing yellow tail
```

### b05-16 — оса, багатоніжка, язик, слід, коліно, борода

Зберегти як `generation/sheets/b05-16.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. wasp — a yellow and black wasp with a thin waist
2. centipede — a centipede with many legs
3. tongue — a face sticking out its tongue
4. footprint — a bare footprint
5. knee — a bent knee with a bandage
6. beard — a man's face with a big beard
```

### b05-17 — вуса, волосся, стопа, скелет

Зберегти як `generation/sheets/b05-17.png`

```
Next sprite sheet. Same style and the same layout rules as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. mustache — a curly mustache
2. hair — a head of long wavy hair
3. foot — a bare foot
4. skeleton — a friendly cartoon skeleton
```

### b05-18 — лікоть, шия, спина, опудало

Зберегти як `generation/sheets/b05-18.png`

```
Next sprite sheet. Same style and the same layout rules as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. elbow — a bent arm showing the elbow
2. neck — a smiling child pointing at their neck
3. back — a child seen from behind
4. scarecrow — a friendly scarecrow on a wooden pole
```

## Крок 3. Нарізка

```
npm run split -- generation/batch-05
```

Перевірте `generation/batch-05/review.html`. Злиплі через межу клітинки предмети скрипт розріже сам. Бракований предмет — перегенерувати окремо («Draw only item N again, same style, alone on a white background»), зберегти як `generation/sheets/fix-<id>.png` і перезапустити нарізку з `--sheet b05-NN`.
