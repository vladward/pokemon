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
      <div className="flex flex-wrap gap-2">
        {forms.map((form) => (
          <FormThumbnail key={form.pokemonId} form={form} />
        ))}
      </div>
    </HudSection>
  );
}
