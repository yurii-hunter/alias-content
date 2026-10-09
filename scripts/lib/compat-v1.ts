// Заморожена копія парсера контенту з додатку версії 1.0.0 (alias/src/content/manifest.ts, коміт 06850e2).
// Ця версія вже в магазинах і читає той самий CDN, що й нові. НЕ ЗМІНЮВАТИ разом із додатком:
// файл описує, що мусить приймати найстаріша версія, яка ще є в людей.
// Правила зміни формату — README.md, «Сумісність зі старими версіями додатку».

interface Manifest {
  schemaVersion: number;
  minAppVersion: string;
  contentVersion: string;
  locales: string[];
  cards: string;
}

interface RemoteCard {
  id: string;
  tier: 'free' | 'full';
  preview?: boolean;
  image: string;
  words: Record<string, string>;
}

const isString = (v: unknown): v is string => typeof v === 'string' && v.length > 0;
const IMAGE_PATH = /^img\/[a-z0-9_-]+\.[0-9a-f]+\.webp$/;
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export function parseManifestV1(json: unknown): Manifest | undefined {
  if (!isRecord(json)) return undefined;
  const { schemaVersion, minAppVersion, contentVersion, locales, cards } = json;
  if (typeof schemaVersion !== 'number' || !isString(minAppVersion) || !isString(contentVersion) || !isString(cards)) {
    return undefined;
  }
  if (!Array.isArray(locales) || !locales.every(isString)) return undefined;
  return { schemaVersion, minAppVersion, contentVersion, locales, cards };
}

function parseCard(json: unknown): RemoteCard | undefined {
  if (!isRecord(json)) return undefined;
  const { id, tier, preview, image, words } = json;
  if (!isString(id) || (tier !== 'free' && tier !== 'full') || typeof image !== 'string' || !IMAGE_PATH.test(image) || !isRecord(words)) return undefined;
  if (!Object.values(words).every(isString)) return undefined;
  return { id, tier, ...(preview === true ? { preview: true } : {}), image, words: words as Record<string, string> };
}

export function parseCardsFileV1(json: unknown): { cards: RemoteCard[] } | undefined {
  if (!isRecord(json) || !Array.isArray(json.cards)) return undefined;
  const cards = json.cards.map(parseCard);
  return cards.every((c) => c !== undefined) ? { cards: cards as RemoteCard[] } : undefined;
}

// Кінець замороженої копії. Нижче — перевірка для збірки.

/** Версія схеми, яку знає 1.0.0 (`SCHEMA_VERSION` у її `config.ts`). */
const APP_V1_SCHEMA = 1;
const APP_V1_VERSION = '1.0.0';

const versionParts = (v: string) => v.split('.').map((p) => parseInt(p, 10) || 0);
function versionAtMost(a: string, b: string): boolean {
  const [pa, pb] = [versionParts(a), versionParts(b)];
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d < 0;
  }
  return true;
}

/** Помилки, через які версія 1.0.0 відкинула б зібраний контент і лишилась на старих картках. */
export function checkAppV1(manifestJson: unknown, cardsJson: unknown): string[] {
  const errors: string[] = [];
  const manifest = parseManifestV1(manifestJson);
  if (!manifest) return ['manifest.json: версія 1.0.0 не розбирає маніфест'];
  if (manifest.schemaVersion > APP_V1_SCHEMA) errors.push(`manifest.json: schemaVersion ${manifest.schemaVersion} — версія 1.0.0 вважатиме контент несумісним`);
  if (!versionAtMost(manifest.minAppVersion, APP_V1_VERSION)) errors.push(`manifest.json: minAppVersion ${manifest.minAppVersion} відрізає версію 1.0.0`);

  const file = parseCardsFileV1(cardsJson);
  if (!file) {
    const bad = Array.isArray((cardsJson as { cards?: unknown })?.cards)
      ? (cardsJson as { cards: unknown[] }).cards.findIndex((c) => !parseCardsFileV1({ cards: [c] }))
      : -1;
    errors.push(`${manifest.cards}: версія 1.0.0 відкидає файл карток${bad >= 0 ? ` (перша погана картка — №${bad + 1})` : ''}`);
  } else if (!file.cards.some((c) => c.tier === 'free' && manifest.locales.every((l) => c.words[l]))) {
    errors.push(`${manifest.cards}: версія 1.0.0 не знайде жодної безкоштовної картки`);
  }
  return errors;
}
