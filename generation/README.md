# Генерація картинок

Картинки карток генеруються в ChatGPT сітками: одне зображення — 6 предметів (3×2). Модель малює їх за один прохід, тож стиль і масштаб у сітці однакові. Потім скрипт нарізки (`scripts/split-sheets.ts`) ріже сітки на окремі `images/<id>.png`.

## Чому по 6

ChatGPT не дає обрати розмір: зображення зазвичай 1024–1536 px. Сітка 3×2 на широкому зображенні дає близько 500 px на предмет. Цього досить: скрипт доведе картинку до 1024 px, а на картці в грі вона займає 250 pt. Сітка 4×4 дала б лише ~250–380 px, і картинки були б розмиті.

Якщо ChatGPT віддає більші зображення (перевірте розмір завантаженого файлу), можна перейти на 9 предметів у сітці 3×3.

## Стилі

**A — як у дизайні гри** (товстий темний контур, плоскі кольори):

```
Style: children's picture-card illustrations for a word game for 4-year-olds. Simple, friendly and instantly recognizable. Bold dark outline in #1E1B2E with an even, thick stroke. Flat bright colors, at most one simple white highlight per object, no gradients, no textures. Cute but not babyish. Each object shown from its most recognizable angle (front or 3/4 view). Animals have friendly faces with simple round eyes. No background scenery, no ground, no cast shadows.
```

**B — як у паперових картках** (глянцевий кліпарт):

```
Style: bright, glossy clip-art like a children's vocabulary flashcard. Semi-realistic shapes with soft shading and gentle highlights, clean smooth edges, vivid saturated colors, no outline or a very thin one. Simple and instantly recognizable for a 4-year-old. Each object shown from its most recognizable angle (front or 3/4 view). Animals look friendly. No background scenery, no ground, no cast shadows.
```

## Порядок роботи

Усі картинки поточних слів уже згенеровані. Попередні партії видалено (вони є в історії git), залишено одну як зразок: `example/`.

1. Додати нові слова в `words.csv` з описом предмета в колонці `draw`.
2. Скопіювати `example/` у `batch-NN/` з наступним номером (10, 11…). У `prompts.md` замінити списки предметів (по 6 на сітку 3×2 або по 4 на квадратну 2×2), у `sheets.csv` — позиції карток. Сітки називати `bNN-MM`.
3. Почати новий чат, прикріпити 1–2 вдалі сітки чи картинки з `images/` як еталон стилю й надіслати промпти по одному повідомленню на сітку.
4. Кожну сітку завантажити й зберегти в `generation/sheets/` під назвою із заголовка промпту (`bNN-MM.png`). Формат байдужий: png, webp чи jpg.
5. Перевірити на око: рівно стільки предметів, скільки в списку, у тому ж порядку, без підписів. Якщо ні — попросити «Regenerate this sheet» і не виправляти вручну.
6. Запустити нарізку: `npm run split -- generation/batch-NN` (одну сітку: `... --sheet bNN-05`). Скрипт прочитає `sheets.csv` партії, знайде предмети на прозорому чи білому тлі, обріже, збереже `images/<id>.png` (1024 px), запише контрольний аркуш партії `batch-NN/review.html` і оновить загальний `generation/review.html`. Червона рамка в аркуші — скрипт знайшов проблему; решту перевірити очима.
   Якщо два предмети злегка торкнулися через межу клітинок, скрипт сам розріже їх по найвужчому місцю й позначить обидва «розрізано автоматично» — перевірте краї в аркуші.
7. Бракований предмет перегенерувати окремо в тому самому чаті: «Draw only item N again, same style, alone on a white background». Зберегти як `generation/sheets/fix-<id>.png` — він має пріоритет над сіткою — і перезапустити нарізку для цієї сітки.
8. Перенести рядки готових карток з `words.csv` у `cards.csv`.

## Файли

```
generation/
  README.md                 цей файл
  review.html               загальний контрольний аркуш: усі слова з words.csv (оновлюється нарізкою або `npm run review`)
  example/prompts.md        зразок промптів партії (колишня партія 09, сітки b09-NN)
  example/sheets.csv        sheet, row, col, index, id — позиція кожної картки в сітці
  example/review.html       зразок контрольного аркуша партії
  sheets/                   завантажені з ChatGPT сітки та fix-<id>.png (у git не потрапляють)
```

Що безкоштовне (30 карток), визначає колонка `tier` у `words.csv`.
