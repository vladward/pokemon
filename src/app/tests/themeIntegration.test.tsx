import { render, screen, fireEvent } from '@testing-library/react';

import { ThemeProvider } from '@/app/providers/ThemeProvider';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';

describe('Theme Integration', () => {
  test('should change body class when switcher is clicked inside provider', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    const button = screen.getByRole('button');

    expect(document.body).toHaveClass('dark-theme');

    fireEvent.click(button);

    expect(document.body).not.toHaveClass('dark-theme');
  });
});
