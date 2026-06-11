import type { TForm } from '@/entities/Pokemon';

import { SpriteThumbnail } from '@/shared/ui/SpriteThumbnail';

interface Props {
  form: TForm;
  className?: string;
}

export function FormThumbnail({ form, className }: Props) {
  return (
    <SpriteThumbnail
      pokemonId={form.pokemonId}
      sprite={form.sprite}
      name={form.name}
      isCurrent={form.isCurrent}
      size="sm"
      className={className}
    />
  );
}
