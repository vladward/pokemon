'use client';
import { SlidersHorizontal, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { usePending } from '@/views/Pokemon/lib/PendingContext';

import { PokemonSearch } from '@/features/PokemonSearch';
import type { PokemonFilters as PokemonFiltersModel } from '@/features/PokemonSearch/model';
import { usePokemonFilters } from '@/features/PokemonSearch/model';

import type { Generation, PokemonRarity } from '@/entities/Pokemon';
import type { Region } from '@/entities/Region';

import { Button } from '@/shared/ui';
import { CustomSelect } from '@/shared/ui/CustomSelect/CustomSelect';

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

  const handleSetFilter = (name: keyof PokemonFiltersModel, value: string) => {
    setFilters({ [name]: value });
  };

  const selectRegions = regions
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

  const hasActiveFilters = !!(
    filters.region ||
    filters.types ||
    filters.rarity ||
    filters.search ||
    filters.generation ||
    filters.evolutionStage
  );

  const activeModalFiltersCount = [
    filters.region,
    filters.types,
    filters.rarity,
    filters.generation,
    filters.evolutionStage,
  ].filter(Boolean).length;

  return (
    <>
      <div className="flex items-stretch justify-between gap-3 text-center h-[40px] py-[20px] box-content">
        <PokemonSearch
          value={filters.search}
          onChange={(value) => handleSetFilter('search', value)}
          disabled={isPending}
        />

        <button
          className="hidden mobile:flex items-center gap-1.5 px-3 h-full rounded-lg border border-input bg-background text-sm font-medium text-foreground/70 shrink-0 relative"
          onClick={() => setModalOpen(true)}
          aria-label={tFilters('filters_title')}
        >
          <SlidersHorizontal className="size-4" />
          {tFilters('filters_title')}
          {activeModalFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              {activeModalFiltersCount}
            </span>
          )}
        </button>

        <div className="flex gap-3 mobile:hidden">
          <CustomSelect
            id="regionId"
            value={filters.region || ''}
            options={selectRegions}
            placeholder={tFilters('region')}
            onChange={(value) => handleSetFilter('region', value)}
            className="!h-full w-[130px] capitalize"
          />

          <CustomSelect
            id="rarityId"
            value={filters.rarity || ''}
            options={rarityOptions}
            placeholder={tFilters('rarity')}
            onChange={(value) => handleSetFilter('rarity', value)}
            className="!h-full w-[130px] capitalize"
          />

          <CustomSelect
            id="typeId"
            value={filters.types || ''}
            options={typeOptions}
            placeholder={tFilters('type')}
            onChange={(value) => handleSetFilter('types', value)}
            className="!h-full w-[130px] capitalize"
          />

          <CustomSelect
            id="generationId"
            value={filters.generation || ''}
            options={generationOptions}
            placeholder={tFilters('generation')}
            onChange={(value) => handleSetFilter('generation', value)}
            className="!h-full w-[130px]"
          />

          <CustomSelect
            id="evolutionStageId"
            value={filters.evolutionStage || ''}
            options={evolutionStageOptions}
            placeholder={tFilters('evo_stage')}
            onChange={(value) => handleSetFilter('evolutionStage', value)}
            className="!h-full w-[130px]"
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
