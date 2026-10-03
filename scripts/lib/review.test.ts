import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { renderReview } from './review.ts';

describe('review', () => {
  const tile = { id: 'apple', note: 'b01-07', uk: 'Яблуко', en: 'Apple', image: '../images/apple.png?1', problems: [] };

  it('renders tiles', () => {
    const html = renderReview({ title: 'Усі', intro: '1 картка', tiles: [tile] });
    assert.match(html, /<img src="\.\.\/images\/apple\.png\?1" alt="" loading="lazy">/);
    assert.match(html, /<b>Яблуко<\/b><span>Apple · apple · b01-07<\/span>/);
    assert.doesNotMatch(html, /class="flag"/);
  });

  it('flags tiles with problems and escapes text', () => {
    const html = renderReview({
      title: 'a<b',
      intro: '',
      tiles: [{ ...tile, uk: '', image: null, problems: ['злиплі "краї" & <рамка>'] }],
    });
    assert.match(html, /<title>a&lt;b<\/title>/);
    assert.match(html, /<figure class="flag"><div class="missing">немає<\/div>/);
    assert.match(html, /<b>apple<\/b>/);
    assert.match(html, /<li>злиплі &quot;краї&quot; &amp; &lt;рамка&gt;<\/li>/);
  });
});
