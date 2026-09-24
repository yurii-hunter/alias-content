import { createHash } from 'node:crypto';

import type { CardsFile, Manifest, SourceCard } from './types.ts';

export const SCHEMA_VERSION = 1;
export const MIN_APP_VERSION = '1.0.0';

/** Перші 8 hex-символів SHA-256: назва файлу змінюється разом із вмістом. */
export function contentHash(data: string | Uint8Array): string {
  return createHash('sha256').update(data).digest('hex').slice(0, 8);
}

export function imagePath(id: string, webp: Uint8Array): string {
  return `img/${id}.${contentHash(webp)}.webp`;
}

/** Файл карток: лише слова мов з маніфесту, щоб недороблений переклад не потрапив у додаток. */
export function buildCardsFile(
  cards: readonly SourceCard[],
  locales: readonly string[],
  images: ReadonlyMap<string, string>,
): CardsFile {
  return {
    cards: cards.map((card) => ({
      id: card.id,
      tier: card.tier,
      ...(card.preview ? { preview: true as const } : {}),
      image: images.get(card.id)!,
      words: Object.fromEntries(locales.map((lang) => [lang, card.words[lang]])),
    })),
  };
}

/** `2026-09-23.17`: дата збірки (UTC) і номер запуску CI. */
export function contentVersion(date: Date, build: number | string): string {
  return `${date.toISOString().slice(0, 10)}.${build}`;
}

export function buildManifest(locales: readonly string[], cardsFile: string, version: string): Manifest {
  return {
    schemaVersion: SCHEMA_VERSION,
    minAppVersion: MIN_APP_VERSION,
    contentVersion: version,
    locales: [...locales],
    cards: cardsFile,
  };
}
