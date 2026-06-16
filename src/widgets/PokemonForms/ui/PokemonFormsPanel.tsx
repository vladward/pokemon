import type { TForm } from '@/entities/Pokemon';

import { HudSection } from '@/shared/ui/hud';
import { ScrollToActive } from '@/shared/ui/ScrollToActive';

import { FormThumbnail } from './FormThumbnail';

interface Props {
  forms: TForm[];
  label?: string;
}

export function PokemonFormsPanel({ forms, label = 'FORMS' }: Props) {
  if (forms.length <= 1) return null;

  return (
    <HudSection label={label}>
      <ScrollToActive className="snap-x snap-mandatory overflow-x-auto scroll-pl-3">
        <div className="flex min-w-max gap-2 py-1 px-3">
          {forms.map((form) => (
            <FormThumbnail
              key={form.pokemonId}
              form={form}
              className="snap-start"
            />
          ))}
        </div>
      </ScrollToActive>
    </HudSection>
  );
}
