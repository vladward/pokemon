import { FC } from 'react';

import {
  AbilitiesSection,
  ElementsPreview,
  GreetingsSection,
  ElementsSlider,
  EvolutionSection,
  EvolutionPreview,
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
    </div>
  );
};
