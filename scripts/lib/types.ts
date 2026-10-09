export type Tier = 'free' | 'full';

/** Рядок `cards.csv` як є, до перевірки. Слова — за кодом мови, порожні клітинки відкинуті. */
export interface RawRow {
  /** Номер рядка у файлі, для повідомлень про помилки. */
  line: number;
  id: string;
  tier: string;
  preview: string;
  category: string;
  words: Record<string, string>;
}

export interface Sheet {
  /** Коди мов у порядку колонок. */
  languages: string[];
  rows: RawRow[];
}

/** Рядок `categories.csv` як є. Назви — за кодом мови інтерфейсу, порожні клітинки відкинуті. */
export interface RawCategory {
  line: number;
  id: string;
  cover: string;
  names: Record<string, string>;
}

export interface CategorySheet {
  languages: string[];
  rows: RawCategory[];
}

/** Перевірена картка. */
export interface SourceCard {
  id: string;
  tier: Tier;
  preview: boolean;
  category: string;
  words: Record<string, string>;
}

/** Перевірена категорія. Порядок у масиві — порядок у списку в додатку. */
export interface Category {
  id: string;
  /** Id картки-обкладинки: безкоштовна або прев'ю, щоб картинка була на кожному пристрої. */
  cover: string;
  names: Record<string, string>;
}

export interface OutputCard {
  id: string;
  tier: Tier;
  preview?: true;
  image: string;
  words: Record<string, string>;
  category: string;
}

/**
 * Файл карток. `categories` і `category` у картці додані для додатку з категоріями.
 * Версія 1.0.0 їх не читає (див. `compat-v1.ts`), тож `schemaVersion` лишається 1.
 */
export interface CardsFile {
  cards: OutputCard[];
  categories: Category[];
}

export interface Manifest {
  schemaVersion: number;
  minAppVersion: string;
  contentVersion: string;
  locales: string[];
  cards: string;
}
