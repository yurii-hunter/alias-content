export type Tier = 'free' | 'full';

/** Рядок `cards.csv` як є, до перевірки. Слова — за кодом мови, порожні клітинки відкинуті. */
export interface RawRow {
  /** Номер рядка у файлі, для повідомлень про помилки. */
  line: number;
  id: string;
  tier: string;
  preview: string;
  words: Record<string, string>;
}

export interface Sheet {
  /** Коди мов у порядку колонок. */
  languages: string[];
  rows: RawRow[];
}

/** Перевірена картка. */
export interface SourceCard {
  id: string;
  tier: Tier;
  preview: boolean;
  words: Record<string, string>;
}

export interface OutputCard {
  id: string;
  tier: Tier;
  preview?: true;
  image: string;
  words: Record<string, string>;
}

export interface CardsFile {
  cards: OutputCard[];
}

export interface Manifest {
  schemaVersion: number;
  minAppVersion: string;
  contentVersion: string;
  locales: string[];
  cards: string;
}
