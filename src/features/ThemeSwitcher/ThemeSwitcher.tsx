import { Theme, useTheme } from '@/app/providers/ThemeProvider';

import { Moon, Sun } from '@/shared/ui';

import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.switcher}
      onClick={toggleTheme}
    >
      <div
        key={theme}
        className={styles.iconContainer}
        style={{ animation: 'fadeScale 0.3s ease-out' }}
      >
        {theme === Theme.DARK ? <Sun className={styles.icon} /> : <Moon className={styles.icon} />}
      </div>
    </button>
  );
};
