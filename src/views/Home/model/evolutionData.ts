import type { MessageKeys, Messages, NestedKeyOf } from 'use-intl/core';

type MessageKey = MessageKeys<Messages, NestedKeyOf<Messages>>;

export interface EvolutionDataItem {
  badge: MessageKey;
  title: MessageKey;
  text: MessageKey;
}

export const evolutionData: EvolutionDataItem[] = [
  {
    badge: 'evolution_way.card.classic.badge',
    title: 'evolution_way.card.classic.title',
    text: 'evolution_way.card.classic.description',
  },
  {
    badge: 'evolution_way.card.resonance.badge',
    title: 'evolution_way.card.resonance.title',
    text: 'evolution_way.card.resonance.description',
  },
  {
    badge: 'evolution_way.card.psychology.badge',
    title: 'evolution_way.card.psychology.title',
    text: 'evolution_way.card.psychology.description',
  },
];
