import { Theme, useTheme } from '@/shared/lib/theme';
import { Moon, Sun } from '@/shared/ui';

import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      data-testid="theme-switcher"
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
