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

  test('should have an active class if the prop is active === true', () => {
    const { container } = render(
      <BurgerButton
        isActive={true}
        onClick={() => {}}
      />,
    );
    expect(container.firstChild).toHaveClass('active');
  });
});
