import { FC } from 'react';

import { ToTopButton } from '@/features';

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
