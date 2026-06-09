import { HudSection } from '@/shared/ui/hud';

import type { TForm } from '@/entities/Pokemon';

import { FormThumbnail } from './FormThumbnail';

interface Props {
  forms: TForm[];
  label?: string;
}

export function PokemonFormsPanel({ forms, label = 'FORMS' }: Props) {
  if (forms.length <= 1) return null;

  return (
    <HudSection label={label}>
      <div className="snap-x snap-mandatory overflow-x-auto">
        <div className="flex min-w-max gap-2 pb-1">
          {forms.map((form) => (
            <FormThumbnail key={form.pokemonId} form={form} className="snap-start" />
          ))}
        </div>
      </div>
    </HudSection>
  );
}
