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
      aria-label="Toggle theme"
    >
      <div
        key={theme}
        className={styles.iconContainer}
      >
        {theme === Theme.DARK ? <Sun className={styles.icon} /> : <Moon className={styles.icon} />}
      </div>
    </button>
  );
};
