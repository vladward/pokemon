'use client';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';

import { PokemonSearch } from '@/features/PokemonSearch';
import { usePokemonFilters } from '@/features/PokemonSearch/model';

import type { Generation, PokemonRarity } from '@/entities/Pokemon';
import type { Region } from '@/entities/Region';

import { Button } from '@/shared/ui';
import { CustomSelect } from '@/shared/ui/CustomSelect/CustomSelect';

interface Props {
  regions: Region[];
  types: string[];
  rarities: PokemonRarity[];
  generations: Generation[];
  onPendingChange?: (pending: boolean) => void;
}

export const PokemonFilters = ({
  regions,
  types,
  rarities,
  generations,
  onPendingChange,
}: Props) => {
  const { filters, setFilters, resetFilters, isPending } = usePokemonFilters();

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  const evolutionStageOptions = [
    { value: 'base', label: 'Base' },
    { value: 'stage1', label: 'Stage 1' },
    { value: 'stage2', label: 'Stage 2' },
  ];

  const handleSetFilter = (
    name: 'search' | 'region' | 'types' | 'rarity' | 'generation' | 'evolutionStage',
    value: string,
  ) => {
    setFilters({ [name]: value });
  };

  const selectRegions = regions
    .filter((r) => r.generationId !== null)
    .map(({ generationId, name }) => ({ value: generationId!.toString(), label: name }));
  const typeOptions = types.map((t) => ({ value: t, label: t }));
  const rarityOptions = rarities.map((r) => ({ value: r, label: r }));
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

  return (
    <div className="flex items-stretch justify-between gap-3 text-center h-[40px] py-[20px] box-content">
      <PokemonSearch
        value={filters.search}
        onChange={(value) => handleSetFilter('search', value)}
      />

      <div className="flex gap-3">
        <CustomSelect
          id="regionId"
          value={filters.region || ''}
          options={selectRegions}
          placeholder="Region"
          onChange={(value) => handleSetFilter('region', value)}
          className="!h-full w-[110px] capitalize"
        />

        <CustomSelect
          id="rarityId"
          value={filters.rarity || ''}
          options={rarityOptions}
          placeholder="Rarity"
          onChange={(value) => handleSetFilter('rarity', value)}
          className="!h-full w-[110px] capitalize"
        />

        <CustomSelect
          id="typeId"
          value={filters.types || ''}
          options={typeOptions}
          placeholder="Type"
          onChange={(value) => handleSetFilter('types', value)}
          className="!h-full w-[110px] capitalize"
        />

        <CustomSelect
          id="generationId"
          value={filters.generation || ''}
          options={generationOptions}
          placeholder="Generation"
          onChange={(value) => handleSetFilter('generation', value)}
          className="!h-full w-[140px]"
        />

        <CustomSelect
          id="evolutionStageId"
          value={filters.evolutionStage || ''}
          options={evolutionStageOptions}
          placeholder="Evo Stage"
          onChange={(value) => handleSetFilter('evolutionStage', value)}
          className="!h-full w-[120px]"
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            aria-label="Clear filters"
            className=" p-0 text-destructive"
          >
            <XIcon
              aria-hidden="true"
              className="size-4"
            />
          </Button>
        )}
      </div>
    </div>
  );
};
