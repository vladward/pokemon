export interface TranslationConfig {
  name: string;
  description: string;
  exportQuery: string;
  clearQuery: string;
  seedQuery: string;
  buildRow: (id: number, text: string) => unknown[];
  maxTextLength?: number;
}
