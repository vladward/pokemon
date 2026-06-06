import type { PokemonRarity } from '../config';

export const rarityConfig: Record<
  PokemonRarity,
  {
    border: string;
    text: string;
    color: string;
    bg: string;
    glow: string;
    stars: number;
  }
> = {
  common: {
    border: 'border-white/50',
    text: 'text-white/90',
    color: 'rgba(255,255,255,0.9)',
    bg: 'bg-black/25',
    glow: '',
    stars: 1,
  },
  uncommon: {
    border: 'border-sky-300/80',
    text: 'text-sky-200',
    color: '#7dd3fc',
    bg: 'bg-black/30',
    glow: 'shadow-[0_0_12px_rgba(94,234,212,0.4)]',
    stars: 2,
  },
  rare: {
    border: 'border-violet-400/85',
    text: 'text-violet-100',
    color: '#a78bfa',
    bg: 'bg-violet-900/25',
    glow: 'shadow-[0_0_16px_rgba(139,92,246,0.6)]',
    stars: 3,
  },
  legendary: {
    border: 'border-yellow-300/80',
    text: 'text-yellow-100',
    color: '#fef08a',
    bg: 'bg-yellow-400/20',
    glow: 'shadow-[0_0_16px_rgba(250,204,21,0.6)]',
    stars: 4,
  },
  mythical: {
    border: 'border-fuchsia-300/80',
    text: 'text-fuchsia-100',
    color: '#f0abfc',
    bg: 'bg-fuchsia-500/20',
    glow: 'shadow-[0_0_18px_rgba(232,121,249,0.65)]',
    stars: 5,
  },
};

export const typeBadgeColors: Record<string, { bg: string; border: string; text: string }> = {
  normal: { bg: 'bg-stone-400/30', border: 'border-stone-300/40', text: 'text-stone-100' },
  fire: { bg: 'bg-orange-500/35', border: 'border-orange-300/50', text: 'text-orange-100' },
  water: { bg: 'bg-sky-500/35', border: 'border-sky-300/50', text: 'text-sky-100' },
  grass: { bg: 'bg-emerald-500/35', border: 'border-emerald-300/50', text: 'text-emerald-100' },
  electric: { bg: 'bg-amber-800/40', border: 'border-yellow-400/70', text: 'text-yellow-50' },
  ice: { bg: 'bg-cyan-400/35', border: 'border-cyan-200/50', text: 'text-cyan-100' },
  fighting: { bg: 'bg-red-600/35', border: 'border-red-400/50', text: 'text-red-100' },
  poison: { bg: 'bg-violet-500/35', border: 'border-violet-300/50', text: 'text-violet-100' },
  ground: { bg: 'bg-amber-500/35', border: 'border-amber-300/50', text: 'text-amber-100' },
  flying: { bg: 'bg-indigo-400/35', border: 'border-indigo-200/50', text: 'text-indigo-100' },
  psychic: { bg: 'bg-pink-500/35', border: 'border-pink-300/50', text: 'text-pink-100' },
  bug: { bg: 'bg-lime-500/35', border: 'border-lime-300/50', text: 'text-lime-100' },
  rock: { bg: 'bg-yellow-700/35', border: 'border-yellow-500/50', text: 'text-yellow-200' },
  ghost: { bg: 'bg-indigo-600/35', border: 'border-indigo-400/50', text: 'text-indigo-100' },
  dragon: { bg: 'bg-blue-600/35', border: 'border-blue-400/50', text: 'text-blue-50' },
  dark: { bg: 'bg-zinc-600/40', border: 'border-zinc-400/50', text: 'text-zinc-200' },
  steel: { bg: 'bg-slate-400/35', border: 'border-slate-200/50', text: 'text-slate-100' },
  fairy: { bg: 'bg-pink-400/35', border: 'border-pink-200/50', text: 'text-pink-100' },
};

export const typeGradients: Record<string, { from: string; to: string }> = {
  normal: { from: 'from-stone-400', to: 'to-stone-500' },
  fire: { from: 'from-orange-400', to: 'to-red-600' },
  water: { from: 'from-sky-500', to: 'to-blue-800' },
  grass: { from: 'from-emerald-400', to: 'to-teal-600' },
  electric: { from: 'from-yellow-400', to: 'to-amber-500' },
  ice: { from: 'from-teal-500', to: 'to-cyan-800' },
  fighting: { from: 'from-red-500', to: 'to-rose-700' },
  poison: { from: 'from-violet-500', to: 'to-purple-700' },
  ground: { from: 'from-amber-400', to: 'to-orange-700' },
  flying: { from: 'from-indigo-400', to: 'to-sky-500' },
  psychic: { from: 'from-pink-400', to: 'to-fuchsia-600' },
  bug: { from: 'from-lime-400', to: 'to-green-600' },
  rock: { from: 'from-yellow-600', to: 'to-stone-700' },
  ghost: { from: 'from-indigo-500', to: 'to-violet-800' },
  dragon: { from: 'from-sky-100', to: 'to-sky-400' },
  dark: { from: 'from-zinc-600', to: 'to-neutral-900' },
  steel: { from: 'from-slate-400', to: 'to-slate-600' },
  fairy: { from: 'from-pink-400', to: 'to-rose-500' },
};

export const typeNeonRgba: Record<string, string> = {
  normal: '180,180,160',
  fire: '251,146,60',
  water: '56,189,248',
  grass: '52,211,153',
  electric: '253,224,71',
  ice: '103,232,249',
  fighting: '248,113,113',
  poison: '192,132,252',
  ground: '251,191,36',
  flying: '129,140,248',
  psychic: '249,168,212',
  bug: '163,230,53',
  rock: '202,138,4',
  ghost: '99,102,241',
  dragon: '96,165,250',
  dark: '161,161,170',
  steel: '148,163,184',
  fairy: '249,168,212',
};

export const LIGHT_BG_TYPES: ReadonlySet<string> = new Set([
  'ice',
  'water',
  'dragon',
  'normal',
  'steel',
  'electric',
  'fairy',
  'flying',
]);

export const LIGHT_BG_BADGE_TEXT: Partial<Record<string, string>> = {
  ice: 'text-cyan-900',
  water: 'text-sky-900',
  dragon: 'text-blue-900',
  normal: 'text-stone-700',
  steel: 'text-slate-700',
  fairy: 'text-pink-800',
  flying: 'text-indigo-800',
};

export const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

export function getGradientClasses(types: string[]): string {
  const primary = types[0] ?? 'normal';
  const secondary = types[1];
  const primaryColors = typeGradients[primary] ?? typeGradients.normal;
  if (!secondary) return `${primaryColors.from} ${primaryColors.to}`;
  const secondaryColors = typeGradients[secondary] ?? typeGradients.normal;
  return `${primaryColors.from} ${secondaryColors.to}`;
}
