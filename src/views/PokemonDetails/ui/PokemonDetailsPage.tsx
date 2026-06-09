import { PokedexDevice } from '@/widgets/PokedexDevice';

import type { TPokemonDetails } from '@/entities/Pokemon';

interface Props {
  pokemon: TPokemonDetails;
}

export function PokemonDetailsPage({ pokemon: _ }: Props) {
  return (
    <PokedexDevice
      leftContent={null}
      rightContent={null}
    />
  );
}
