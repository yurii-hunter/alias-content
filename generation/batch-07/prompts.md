# Рівень 2, їжа та одяг: промпти для ChatGPT

16 сіток, 94 картки: 15 по 6 предметів (3×2) і остання квадратна на 4 (2×2). Порядок у списку = порядок у сітці (рядками, зліва направо) = `sheets.csv`. Не змінюйте порядок: за ним скрипт нарізки називає картинки.

Сітки називаються `b07-NN`. Стиль — B, як у попередніх.

На що дивитися: схожі ягоди (чорниця/ожина/журавлина/смородина), зелень (кріп/петрушка), лайм/лимон. Кожна має бути впізнавана за кольором і формою з опису. Етикетки на кетчупі, варенні, пластівцях — без написів; якщо з'явилися букви, перегенеруйте предмет окремо з «no letters».

## Крок 1. Новий чат з еталоном

Почніть **новий чат** і прикріпіть до першого повідомлення 1–2 найвдаліші сітки з їжею з попередніх партій (наприклад, `sheet-07.png` і `b03-04.png`).

### b07-01 — диня, слива, абрикос, ківі, манго, кокос

Зберегти як `generation/sheets/b07-01.png`

```
A sprite sheet of 6 separate illustrations for children's word-game cards. The attached images are earlier sheets from the same set: match their style, level of detail, colors and item size exactly.

Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.

Items, in order:
1. melon — a yellow oval melon
2. plum — a purple plum
3. apricot — an orange apricot
4. kiwi — a kiwi fruit cut in half
5. mango — a yellow-red mango
6. coconut — a brown coconut cut open

Layout: a wide 3:2 image with a grid of 3 columns and 2 rows. Exactly 6 separate items, placed row by row from top-left to bottom-right in the exact order of the list, one item per cell. Each item centered in its cell, filling about 75% of it, fully visible, not touching other items or the image edges. Leave a clear empty gap between neighboring items, including between the top and bottom rows. All items the same visual size regardless of real-world size. Transparent background; if that is not possible, pure flat white. No text, letters, numbers, labels, borders, frames or grid lines. Draw only the listed items.
```

## Крок 2. Решта сіток

Продовжуйте в тому самому чаті, по одному повідомленню на сітку. Якщо стиль почав відрізнятися від еталона — новий чат, знову крок 1, і далі з тієї сітки, на якій зупинилися.

### b07-02 — чорниця, гранат, авокадо, інжир, грейпфрут, ожина

Зберегти як `generation/sheets/b07-02.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. blueberry — a small pile of blueberries
2. pomegranate — a red pomegranate cut open
3. avocado — an avocado cut in half with the pit
4. fig — a purple fig cut open
5. grapefruit — a grapefruit cut in half
6. blackberry — a blackberry
```

### b07-03 — смородина, лайм, хурма, журавлина, фініки, оливка

Зберегти як `generation/sheets/b07-03.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. currant — a bunch of red currants
2. lime — a green lime
3. persimmon — an orange persimmon
4. cranberry — a handful of red cranberries
5. dates — a few brown dates
6. olive — two green olives on a branch
```

### b07-04 — часник, баклажан, буряк, редиска, кабачок, цвітна капуста

Зберегти як `generation/sheets/b07-04.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. garlic — a white head of garlic
2. eggplant — a purple eggplant
3. beet — a dark red beet with leaves
4. radish — a red radish with leaves
5. zucchini — a green zucchini
6. cauliflower — a white cauliflower
```

### b07-05 — перець чилі, кріп, квасоля, ріпка, спаржа, петрушка

Зберегти як `generation/sheets/b07-05.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. chili — a red chili pepper
2. dill — a bunch of dill
3. beans — a pile of red beans
4. turnip — a round yellow turnip with leaves
5. asparagus — a bunch of green asparagus
6. parsley — a bunch of parsley
```

### b07-06 — горіх, каштан, арахіс, яєчня, рис, каша

Зберегти як `generation/sheets/b07-06.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. walnut — a walnut in its shell
2. chestnut — a shiny brown chestnut
3. peanut — a peanut in its shell
4. fried egg — a fried egg on a pan
5. rice — a bowl of white rice
6. porridge — a bowl of oatmeal porridge with berries
```

### b07-07 — хот-дог, салат, борщ, фрикадельки, омлет, куряча ніжка

Зберегти як `generation/sheets/b07-07.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. hot dog — a hot dog in a bun
2. salad — a bowl of green salad
3. borscht — a bowl of red beet soup with sour cream
4. meatballs — a plate of meatballs
5. omelette — a folded omelette on a plate
6. chicken leg — a roasted chicken drumstick
```

### b07-08 — пиріг, вафля, крендель, бублик, круасан, багет

Зберегти як `generation/sheets/b07-08.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. pie — a round fruit pie
2. waffle — a square waffle
3. pretzel — a salted pretzel
4. bagel — a bagel with sesame seeds
5. croissant — a golden croissant
6. baguette — a long baguette
```

### b07-09 — цукрова вата, кекс, пряничний чоловічок, маршмелоу, желе, жуйка

Зберегти як `generation/sheets/b07-09.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. cotton candy — pink cotton candy on a stick
2. cupcake — a cupcake with frosting
3. gingerbread man — a gingerbread man cookie
4. marshmallow — pink and white marshmallows
5. jelly — a wobbly red jelly dessert
6. chewing gum — a pack of chewing gum with a big pink bubble above it
```

### b07-10 — чай, какао, лимонад, молочний коктейль, йогурт, пластівці

Зберегти як `generation/sheets/b07-10.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. tea — a cup of tea with a tea bag
2. cocoa — a mug of hot cocoa
3. lemonade — a glass of lemonade with ice and a lemon slice
4. milkshake — a milkshake with a straw and whipped cream
5. yogurt — a cup of yogurt with a spoon
6. cereal — a bowl of cereal with milk
```

### b07-11 — кетчуп, варення, масло, сіль, цукор, тост

Зберегти як `generation/sheets/b07-11.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. ketchup — a red ketchup bottle without a label
2. jam — a jar of strawberry jam with a checked lid
3. butter — a block of butter on a dish
4. salt — a glass salt shaker with a metal top
5. sugar — white sugar cubes in a small blue bowl
6. toast — a slice of golden toast
```

### b07-12 — суші, тако, палички для їжі, трубочка, капелюх, берет

Зберегти як `generation/sheets/b07-12.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. sushi — two pieces of sushi
2. taco — a taco
3. chopsticks — a pair of chopsticks
4. straw — a striped drinking straw
5. hat — a brimmed sun hat
6. beret — a red beret
```

### b07-13 — пальто, сорочка, джинси, купальник, дощовик, худі

Зберегти як `generation/sheets/b07-13.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. coat — a long coat with buttons
2. shirt — a button-up shirt with a collar
3. jeans — a pair of blue jeans
4. swimsuit — a one-piece swimsuit
5. raincoat — a yellow raincoat with a hood
6. hoodie — a hooded sweatshirt
```

### b07-14 — комбінезон, колготки, жилетка, фартух, пасок, краватка

Зберегти як `generation/sheets/b07-14.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. overalls — a pair of denim overalls
2. tights — a pair of colorful tights
3. vest — a knitted vest
4. apron — a kitchen apron
5. belt — a leather belt with a buckle
6. tie — a necktie
```

### b07-15 — сандалі, в'єтнамки, черевик, сонцезахисні окуляри, обідок, наручний годинник

Зберегти як `generation/sheets/b07-15.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. sandals — a pair of sandals
2. flip flops — a pair of flip-flops
3. shoe — a single laced shoe
4. sunglasses — a pair of dark sunglasses
5. headband — a hair headband with a bow
6. watch — a wristwatch
```

### b07-16 — каблучка, намисто, гаманець, валіза

Зберегти як `generation/sheets/b07-16.png`

```
Next sprite sheet. Same style and the same layout rules as before, but this time a square image with a 2×2 grid: 4 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. ring — a gold ring with a gem
2. necklace — a bead necklace
3. wallet — a leather wallet
4. suitcase — a travel suitcase with wheels
```

## Крок 3. Нарізка

```
npm run split -- generation/batch-07
```

Перевірте `generation/batch-07/review.html`. Злиплі через межу клітинки предмети скрипт розріже сам. Бракований предмет — перегенерувати окремо, зберегти як `generation/sheets/fix-<id>.png` і перезапустити нарізку з `--sheet b07-NN`.
