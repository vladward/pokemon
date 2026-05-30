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
} from '@/pages/Home/ui';

import styles from './Home.module.scss';

export const Home: FC = () => {
  return (
    <div className={styles.container}>
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
