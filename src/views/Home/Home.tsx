import { FC } from 'react';

import {
  AbilitiesSection,
  ElementsPreview,
  ElementsSlider,
  EvolutionPreview,
  EvolutionSection,
  GreetingsSection,
  LeaguePreview,
  LeagueSection,
} from '@/views/Home/ui';

import { ToTopButton } from '@/features/ToTopButton';

export const Home: FC = () => {
  return (
    <div className="relative flex flex-col items-center">
      <GreetingsSection />
      <AbilitiesSection />
      <ElementsPreview />
      <ElementsSlider />
      <EvolutionPreview />
      <EvolutionSection />
      <LeaguePreview />
      <LeagueSection />
      <ToTopButton />
    </div>
  );
};
