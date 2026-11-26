# Партія 10: «Зима й Різдво»

12 нових карток категорії `winter`, 2 сітки по 6 предметів (3×2). Порядок у списку = порядок у сітці (рядками, зліва направо) = `sheets.csv`. Не змінюйте порядок: за ним скрипт нарізки називає картинки.

Сітки називаються `b10-NN`. Стиль — B, як у попередніх партіях.

Святий Миколай — без релігійних атрибутів (без митри й посоха), у червоному вбранні з бородою, як його зазвичай малюють для дітей. Панчоха й шапка — без написів: якщо з'явилися літери, перегенеруйте предмет окремо.

## Крок 1. Новий чат з еталоном

Почніть **новий чат** і прикріпіть до першого повідомлення 1–2 найвдаліші сітки або кілька готових картинок з `images/` у цьому стилі, наприклад `images/snowman.png`, `images/christmas_tree.png`, `images/gingerbread_man.png`.

### b10-01 — Святий Миколай, ангел, ельф, ялинкова кулька, гірлянда, шапка Миколая

Зберегти як `generation/sheets/b10-01.png`

```
A sprite sheet of 6 separate illustrations for children's word-game cards. The attached images are earlier illustrations from the same set: match their style, level of detail, colors and item size exactly.

Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.

Items, in order:
1. santa claus — a jolly old man with a long white beard in a red coat and a red hat with white fur trim, carrying a sack of presents
2. angel — a cute little angel child with white feathered wings and a golden halo
3. elf — a cheerful Christmas elf in a green outfit with pointy ears and a pointy green hat
4. christmas ornament — a shiny red round Christmas tree ball with a gold cap and a hanging loop
5. christmas lights — a short string of colorful glowing Christmas light bulbs on a green wire, in a gentle wave
6. santa hat — a red Santa hat with white fur trim and a white pompom

Layout: a wide 3:2 image with a grid of 3 columns and 2 rows. Exactly 6 separate items, placed row by row from top-left to bottom-right in the exact order of the list, one item per cell. Each item centered in its cell, filling about 75% of it, fully visible, not touching other items or the image edges. Leave a clear empty gap between neighboring items, including between the top and bottom rows. All items the same visual size regardless of real-world size. Transparent background; if that is not possible, pure flat white. No text, letters, numbers, labels, borders, frames or grid lines. Draw only the listed items.
```

## Крок 2. Друга сітка

Продовжуйте в тому самому чаті.

### b10-02 — карамельна паличка, пряничний будиночок, різдвяна панчоха, сніжна куля, бенгальський вогник, шайба

Зберегти як `generation/sheets/b10-02.png`

```
Next sprite sheet. Same style and the same layout rules as before: 6 items in the exact order, one per cell, same size, a clear empty gap between neighboring items, transparent or white background, no text.

Items, in order:
1. candy cane — a red and white striped candy cane
2. gingerbread house — a small gingerbread house with white icing on the roof and colorful candies
3. christmas stocking — a red Christmas stocking with a white fur top, hanging from a small loop, no text
4. snow globe — a glass snow globe on a wooden base with a tiny fir tree and snowflakes inside
5. sparkler — a lit sparkler stick with bright golden star-shaped sparks
6. hockey puck — a black ice hockey puck seen at a 3/4 angle
```

## Крок 3. Нарізка

```
npm run split -- generation/batch-10
```

Перевірте `generation/batch-10/review.html` і загальний `generation/review.html`. Бракований предмет — перегенерувати окремо, зберегти як `generation/sheets/fix-<id>.png` і перезапустити нарізку з `--sheet b10-NN`.

## Крок 4. Перенесення

Коли всі 12 картинок готові, перенесіть рядки цих карток з `words.csv` у `cards.csv` (колонки `id`, `tier`, `preview`, `category` і мови).
