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

type DraftFilters = {
  types?: string[];
  rarity?: string[];
  region?: string[];
  generation?: string[];
  evolutionStage?: string[];
};

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

  const [draft, setDraft] = useState<DraftFilters>({});
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  useEffect(() => {
    if (open) setDraft({ ...filtersRef.current });
  }, [open]);

  const toggle = (key: keyof DraftFilters, value: string) =>
    setDraft((prev) => {
      const current = prev[key] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next.length ? next : undefined };
    });

  const regionOptions = regions
    .filter((r) => r.generationId !== null)
    .map(({ slug, name }) => ({ value: slug, label: name }));

  const typeOptions = types.map((type) => ({
    value: type,
    label: tTypes(type as Parameters<typeof tTypes>[0]),
  }));

  const rarityOptions = rarities.map((r) => ({
    value: r,
    label: tCard(`rarity.${r}` as `rarity.${PokemonRarity}`),
  }));

  const generationOptions = generations.map(({ slug, name }) => ({
    value: slug,
    label: name,
  }));

  const evolutionStageOptions = (['base', 'stage1', 'stage2'] as const).map((s) => ({
    value: s,
    label: tCard(`evolution_stage.${s}` as `evolution_stage.${typeof s}`),
  }));

  const handleApply = () => {
    onApply({
      types: draft.types ?? [],
      rarity: draft.rarity ?? [],
      region: draft.region ?? [],
      generation: draft.generation ?? [],
      evolutionStage: draft.evolutionStage ?? [],
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
              label={tFilters('type')}
              options={typeOptions}
              values={draft.types}
              allLabel={all}
              onToggle={(v) => toggle('types', v)}
              onClear={() => setDraft((p) => ({ ...p, types: undefined }))}
            />
            <FilterSection
              label={tFilters('rarity')}
              options={rarityOptions}
              values={draft.rarity}
              allLabel={all}
              onToggle={(v) => toggle('rarity', v)}
              onClear={() => setDraft((p) => ({ ...p, rarity: undefined }))}
            />
            <FilterSection
              label={tFilters('region')}
              options={regionOptions}
              values={draft.region}
              allLabel={all}
              onToggle={(v) => toggle('region', v)}
              onClear={() => setDraft((p) => ({ ...p, region: undefined }))}
            />
            <FilterSection
              label={tFilters('generation')}
              options={generationOptions}
              values={draft.generation}
              allLabel={all}
              onToggle={(v) => toggle('generation', v)}
              onClear={() => setDraft((p) => ({ ...p, generation: undefined }))}
            />
            <FilterSection
              label={tFilters('evo_stage')}
              options={evolutionStageOptions}
              values={draft.evolutionStage}
              allLabel={all}
              onToggle={(v) => toggle('evolutionStage', v)}
              onClear={() => setDraft((p) => ({ ...p, evolutionStage: undefined }))}
            />
          </div>

          <div className="px-5 py-4 border-t border-border flex justify-end gap-3 shrink-0">
            <Button
              variant="ghost"
              className="text-destructive py-2 px-5"
              onClick={handleReset}
            >
              {tFilters('clear')}
            </Button>
            <Button
              className="py-2 px-5"
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
  values?: string[];
  allLabel: string;
  onToggle: (value: string) => void;
  onClear: () => void;
}

const FilterSection = ({
  label,
  options,
  values,
  allLabel,
  onToggle,
  onClear,
}: FilterSectionProps) => (
  <div>
    <p className="text-xs font-semibold text-foreground/50 mb-3 uppercase tracking-widest text-left">
      {label}
    </p>
    <div className="flex flex-wrap gap-2">
      <FilterChip
        label={allLabel}
        active={!values?.length}
        onClick={onClear}
      />
      {options.map((opt) => (
        <FilterChip
          key={opt.value}
          label={opt.label}
          active={!!values?.includes(opt.value)}
          onClick={() => onToggle(opt.value)}
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
