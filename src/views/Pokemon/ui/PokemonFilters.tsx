'use client';
import { SlidersHorizontal, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { usePending } from '@/views/Pokemon/lib/PendingContext';

import { PokemonSearch } from '@/features/PokemonSearch';
import { usePokemonFilters } from '@/features/PokemonSearch/model';

import type { Generation, PokemonRarity } from '@/entities/Pokemon';
import type { Region } from '@/entities/Region';

import { Button } from '@/shared/ui';
import { MultiSelect } from '@/shared/ui/MultiSelect/MultiSelect';

import { MobileFiltersModal } from './MobileFiltersModal';

interface Props {
  regions: Region[];
  types: string[];
  rarities: PokemonRarity[];
  generations: Generation[];
}

export const PokemonFilters = ({ regions, types, rarities, generations }: Props) => {
  const tFilters = useTranslations('pokemon_filters');
  const tCard = useTranslations('pokemon_card');
  const tTypes = useTranslations('elements');
  const { filters, setFilters, resetFilters, isPending } = usePokemonFilters();
  const { setIsPending } = usePending();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIsPending(isPending);
  }, [isPending, setIsPending]);

  const evolutionStageOptions = (['base', 'stage1', 'stage2'] as const).map((s) => ({
    value: s,
    label: tCard(`evolution_stage.${s}` as `evolution_stage.${typeof s}`),
  }));

  const selectRegions = regions
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

  const hasActiveFilters = !!(
    filters.region?.length ||
    filters.types?.length ||
    filters.rarity?.length ||
    filters.search ||
    filters.generation?.length ||
    filters.evolutionStage?.length
  );

  const activeModalFiltersCount = [
    filters.region?.length,
    filters.types?.length,
    filters.rarity?.length,
    filters.generation?.length,
    filters.evolutionStage?.length,
  ].filter(Boolean).length;

  return (
    <>
      <div className="flex items-stretch justify-between gap-3 text-center h-[40px] py-[20px] box-content">
        <PokemonSearch
          value={filters.search}
          onChange={(value) => setFilters({ search: value })}
          disabled={isPending}
        />

        <button
          className="hidden laptop:flex items-center gap-1.5 px-3 h-full rounded-lg border border-input bg-background text-sm font-medium text-foreground/70 shrink-0 relative"
          onClick={() => setModalOpen(true)}
          aria-label={tFilters('filters_title')}
        >
          <SlidersHorizontal className="size-4" />
          {activeModalFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              {activeModalFiltersCount}
            </span>
          )}
        </button>

        <div className="flex gap-3 laptop:hidden">
          <MultiSelect
            values={filters.region ?? []}
            options={selectRegions}
            placeholder={tFilters('region')}
            onChange={(value) => setFilters({ region: value })}
            className="!h-full w-[130px]"
            disabled={isPending}
          />

          <MultiSelect
            values={filters.rarity ?? []}
            options={rarityOptions}
            placeholder={tFilters('rarity')}
            onChange={(value) => setFilters({ rarity: value })}
            className="!h-full w-[130px]"
            disabled={isPending}
          />

          <MultiSelect
            values={filters.types ?? []}
            options={typeOptions}
            placeholder={tFilters('type')}
            onChange={(value) => setFilters({ types: value })}
            className="!h-full w-[130px]"
            disabled={isPending}
          />

          <MultiSelect
            values={filters.generation ?? []}
            options={generationOptions}
            placeholder={tFilters('generation')}
            onChange={(value) => setFilters({ generation: value })}
            className="!h-full w-[130px]"
            disabled={isPending}
          />

          <MultiSelect
            values={filters.evolutionStage ?? []}
            options={evolutionStageOptions}
            placeholder={tFilters('evo_stage')}
            onChange={(value) => setFilters({ evolutionStage: value })}
            className="!h-full w-[130px]"
            disabled={isPending}
          />

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              aria-label={tFilters('clear')}
              className="p-0 text-destructive"
            >
              <XIcon
                aria-hidden="true"
                className="size-4"
              />
            </Button>
          )}
        </div>
      </div>

      <MobileFiltersModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        filters={filters}
        regions={regions}
        types={types}
        rarities={rarities}
        generations={generations}
        onApply={setFilters}
        onReset={resetFilters}
      />
    </>
  );
};
