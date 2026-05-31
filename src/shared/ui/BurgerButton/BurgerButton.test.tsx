import { render, screen, fireEvent } from '@testing-library/react';

import { BurgerButton } from './BurgerButton';

describe('BurgerButton UI', () => {
  test('should trigger onClick when pressed', () => {
    const handleClick = jest.fn();
    render(
      <BurgerButton
        isActive={false}
        onClick={handleClick}
      />,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should set data-active=true when isActive prop is true', () => {
    render(
      <BurgerButton
        isActive={true}
        onClick={() => {}}
      />,
    );
    expect(screen.getByRole('button')).toHaveAttribute('data-active', 'true');
  });
});
