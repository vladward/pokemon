'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import type { PokemonFilters } from '@/features/PokemonSearch/model';

import type { Generation, PokemonRarity } from '@/entities/Pokemon';
import type { Region } from '@/entities/Region';

import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/ui';

interface Props {
  open: boolean;
  onClose: () => void;
  filters: PokemonFilters;
  regions: Region[];
  types: string[];
  rarities: PokemonRarity[];
  generations: Generation[];
  onApply: (filters: Partial<PokemonFilters>) => void;
  onReset: () => void;
}

export const MobileFiltersModal = ({
  open,
  onClose,
  filters,
  regions,
  types,
  rarities,
  generations,
  onApply,
  onReset,
}: Props) => {
  const tFilters = useTranslations('pokemon_filters');
  const tCard = useTranslations('pokemon_card');
  const tTypes = useTranslations('elements');

  const [draft, setDraft] = useState<PokemonFilters>({});
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  useEffect(() => {
    if (open) setDraft({ ...filtersRef.current });
  }, [open]);

  const pick = (key: keyof PokemonFilters, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value || undefined }));

  const regionOptions = regions
    .filter((r) => r.generationId !== null)
    .map(({ generationId, name }) => ({ value: generationId!.toString(), label: name }));

  const typeOptions = types.map((type) => ({
    value: type,
    label: tTypes(type as Parameters<typeof tTypes>[0]),
  }));

  const rarityOptions = rarities.map((r) => ({
    value: r,
    label: tCard(`rarity.${r}` as `rarity.${PokemonRarity}`),
  }));

  const generationOptions = generations.map(({ id, name }) => ({
    value: id.toString(),
    label: name,
  }));

  const evolutionStageOptions = (['base', 'stage1', 'stage2'] as const).map((s) => ({
    value: s,
    label: tCard(`evolution_stage.${s}` as `evolution_stage.${typeof s}`),
  }));

  const handleApply = () => {
    onApply({
      region: draft.region ?? '',
      types: draft.types ?? '',
      rarity: draft.rarity ?? '',
      generation: draft.generation ?? '',
      evolutionStage: draft.evolutionStage ?? '',
    });
    onClose();
  };

  const handleReset = () => {
    setDraft({});
    onReset();
    onClose();
  };

  const all = tFilters('all');

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => !v && onClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/50 backdrop-blur-sm z-[1002]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300',
          )}
        />
        <Dialog.Content
          className={cn(
            'fixed bottom-0 left-0 right-0 z-[1003]',
            'bg-background rounded-t-[20px] max-h-[82vh] flex flex-col',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
            'duration-300',
          )}
        >
          <Dialog.Title className="sr-only">{tFilters('filters_title')}</Dialog.Title>

          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border shrink-0">
            <span className="text-base font-semibold">{tFilters('filters_title')}</span>
            <Dialog.Close asChild>
              <button
                aria-label={tFilters('clear')}
                className="text-foreground/60 hover:text-foreground transition-colors p-1"
              >
                <XIcon className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="overflow-y-auto flex-1 px-5 py-4 space-y-6">
            <FilterSection
              label={tFilters('region')}
              options={regionOptions}
              value={draft.region}
              allLabel={all}
              onChange={(v) => pick('region', v)}
            />
            <FilterSection
              label={tFilters('rarity')}
              options={rarityOptions}
              value={draft.rarity}
              allLabel={all}
              onChange={(v) => pick('rarity', v)}
            />
            <FilterSection
              label={tFilters('type')}
              options={typeOptions}
              value={draft.types}
              allLabel={all}
              onChange={(v) => pick('types', v)}
            />
            <FilterSection
              label={tFilters('generation')}
              options={generationOptions}
              value={draft.generation}
              allLabel={all}
              onChange={(v) => pick('generation', v)}
            />
            <FilterSection
              label={tFilters('evo_stage')}
              options={evolutionStageOptions}
              value={draft.evolutionStage}
              allLabel={all}
              onChange={(v) => pick('evolutionStage', v)}
            />
          </div>

          <div className="px-5 py-4 border-t border-border flex gap-3 shrink-0">
            <Button
              variant="ghost"
              className="flex-1 text-destructive"
              onClick={handleReset}
            >
              {tFilters('clear')}
            </Button>
            <Button
              className="flex-1"
              onClick={handleApply}
            >
              {tFilters('apply')}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface FilterSectionProps {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  allLabel: string;
  onChange: (value: string) => void;
}

const FilterSection = ({ label, options, value, allLabel, onChange }: FilterSectionProps) => (
  <div>
    <p className="text-xs font-semibold text-foreground/50 mb-3 uppercase tracking-widest text-left">
      {label}
    </p>
    <div className="flex flex-wrap gap-2">
      <FilterChip
        label={allLabel}
        active={!value}
        onClick={() => onChange('')}
      />
      {options.map((opt) => (
        <FilterChip
          key={opt.value}
          label={opt.label}
          active={value === opt.value}
          onClick={() => onChange(opt.value)}
        />
      ))}
    </div>
  </div>
);

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterChip = ({ label, active, onClick }: FilterChipProps) => (
  <button
    onClick={onClick}
    className={cn(
      'px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize border',
      active
        ? 'bg-primary text-primary-foreground border-transparent'
        : 'bg-secondary text-foreground border-border hover:bg-tertiary',
    )}
  >
    {label}
  </button>
);
