'use client';
import { XIcon } from 'lucide-react';

import { PokemonSearch } from '@/features/PokemonSearch';
import { usePokemonFilters } from '@/features/PokemonSearch/model';

import type { getGenerationList, getRarityList, getTypeList } from '@/entities/Pokemon';
import type { getRegionList } from '@/entities/Region';

import { Button } from '@/shared/ui';
import { CustomSelect } from '@/shared/ui/CustomSelect/CustomSelect';

interface Props {
  regions: Awaited<ReturnType<typeof getRegionList>>;
  types: Awaited<ReturnType<typeof getTypeList>>;
  rarities: Awaited<ReturnType<typeof getRarityList>>;
  generations: Awaited<ReturnType<typeof getGenerationList>>;
}

export const PokemonFilters = ({ regions, types, rarities, generations }: Props) => {
  const { filters, setFilters, resetFilters } = usePokemonFilters();

  const handleSetFilter = (
    name: 'search' | 'region' | 'type' | 'rarity' | 'generation',
    value: string,
  ) => {
    setFilters({ [name]: value });
  };

  const selectRegions = regions.map(({ id, name }) => ({ value: id.toString(), label: name }));
  const typeOptions = types.map((t) => ({ value: t, label: t }));
  const rarityOptions = rarities.map((r) => ({ value: r, label: r }));
  const generationOptions = generations.map(({ id, name }) => ({
    value: id.toString(),
    label: name,
  }));

  const hasActiveFilters = !!(
    filters.region ||
    filters.type ||
    filters.rarity ||
    filters.search ||
    filters.generation
  );

  return (
    <div className="flex items-stretch justify-start gap-3 text-center h-[40px] py-[20px] box-content mx-8">
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
          value={filters.type || ''}
          options={typeOptions}
          placeholder="Type"
          onChange={(value) => handleSetFilter('type', value)}
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
