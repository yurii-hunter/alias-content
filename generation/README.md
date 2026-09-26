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

1. Вибір стилю: `sheet-01` у двох чатах (A і B), промпти в `free-100/prompts.md`.
2. Решта сіток — в обраному чаті, по одному повідомленню на сітку.
3. Кожну сітку завантажити й зберегти в `generation/sheets/` під назвою із заголовка промпту (`sheet-NN.png`, `b02-NN.png`…). Формат байдужий: png, webp чи jpg.
4. Перевірити на око: рівно стільки предметів, скільки в списку, у тому ж порядку, без підписів. Якщо ні — попросити «Regenerate this sheet» і не виправляти вручну.
5. Запустити нарізку: `npm run split -- generation/free-100` (одну сітку: `... -- generation/free-100 --sheet sheet-05`). Скрипт прочитає `free-100/sheets.csv`, знайде предмети на прозорому чи білому тлі, обріже, збереже `images/<id>.png` (1024 px) і запише контрольний аркуш `free-100/review.html`. Червона рамка в аркуші — скрипт знайшов проблему; решту перевірити очима.
   Якщо два предмети злегка торкнулися через межу клітинок, скрипт сам розріже їх по найвужчому місцю й позначить обидва «розрізано автоматично» — перевірте краї в аркуші.
6. Бракований предмет перегенерувати окремо в тому самому чаті: «Draw only item N again, same style, alone on a white background». Зберегти як `generation/sheets/fix-<id>.png` — він має пріоритет над сіткою — і перезапустити нарізку для цієї сітки.
7. Перенести рядки готових карток з `words.csv` у `cards.csv`.

## Файли

```
generation/
  README.md                 цей файл
  free-100/prompts.md       промпти: вибір стилю + 16 наступних сіток
  free-100/sheets.csv       sheet, row, col, index, id — позиція кожної картки в сітці
  free-100/review.html      контрольний аркуш після нарізки
  batch-02/                 друга сотня (рівень 1): prompts.md, sheets.csv, сітки b02-NN
  batch-03/                 третя сотня (рівень 1): сітки b03-NN
  batch-04/                 решта рівня 1 (32 картки, зокрема сцени-віньєтки): сітки b04-NN
  batch-05/                 рівень 2: тварини й тіло (104 картки): сітки b05-NN
  batch-06/                 рівень 2: дім та іграшки (90 карток): сітки b06-NN
  batch-07/                 рівень 2: їжа та одяг (94 картки): сітки b07-NN
  batch-08/                 рівень 2: природа, місця, спорт, казка (94 картки, зокрема віньєтки): сітки b08-NN
  batch-09/                 рівень 2: люди, транспорт, інструменти, школа, музика (116 карток): сітки b09-NN
  sheets/                   завантажені з ChatGPT сітки та fix-<id>.png (у git не потрапляють)
```

`free-100/` — перша сотня слів рівня 1. Безкоштовних у грі тепер 30, решта з цієї сотні стали повними; що безкоштовне, визначає колонка `tier` у `words.csv`.
