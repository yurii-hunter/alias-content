// Перебудовує загальний контрольний аркуш generation/review.html з усіма партіями.
//   node scripts/review.ts
import { writeOverallReview } from './lib/review.ts';

console.log(`Загальний аркуш: ${await writeOverallReview()}`);
