'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Moon, Sun } from '@/shared/ui';

export const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-11 h-11 border-2 border-lightBlue rounded-xl bg-transparent" />;
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      data-testid="theme-switcher"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        flex items-center justify-center
        w-11 h-11 cursor-pointer rounded-xl
        border-2 border-lightBlue
        text-lightBlue
        bg-transparent
        shadow-[0_2px_8px_rgba(0,0,0,0.05)]
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 hover:shadow-[0_5px_12px_rgba(0,0,0,0.1)]
        active:scale-95
      "
    >
      <div
        key={theme}
        className="flex items-center justify-center animate-[fadeIn_0.3s_ease-out]"
      >
        {isDark ? (
          <Sun className="w-[1.375rem] h-[1.375rem] pointer-events-none transition-colors duration-300" />
        ) : (
          <Moon className="w-[1.375rem] h-[1.375rem] pointer-events-none transition-colors duration-300" />
        )}
      </div>
    </button>
  );
};
