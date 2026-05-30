import { FC, ReactNode, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '@/shared/lib/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
    if (saved && Object.values(Theme).includes(saved)) return saved;
    return Theme.DARK;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) {
        setTheme(e.matches ? Theme.DARK : Theme.LIGHT);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_THEME_KEY && e.newValue) {
        setTheme(e.newValue as Theme);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useLayoutEffect(() => {
    const body = document.body;
    if (theme === Theme.DARK) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
