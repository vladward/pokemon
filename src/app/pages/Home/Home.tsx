import { FC } from 'react';

import {
  AbilitiesSection,
  ElementsSection,
  GreetingsSection,
  ElementsSlider,
  EvolutionSection,
  EvolutionPreview,
  LeaguePreview,
  LeagueSection,
} from '@/app/pages/Home/ui';

import styles from './Home.module.scss';

export const Home: FC = () => {
  return (
    <div className={styles.container}>
      <GreetingsSection />
      <AbilitiesSection />
      <ElementsSection />
      <ElementsSlider />
      <EvolutionPreview />
      <EvolutionSection />
      <LeaguePreview />
      <LeagueSection />
    </div>
  );
};
