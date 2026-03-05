import { render, fireEvent, screen, act } from '@testing-library/react';

import ToTopButton from '../ui/ToTopButton';

describe('ToTopButton Unit', () => {
  const setScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', {
      value,
      writable: true,
      configurable: true,
    });
  };

  it('should toggle visibility class based on 1000px scroll threshold', () => {
    render(<ToTopButton />);
    const button = screen.getByRole('button');

    act(() => {
      setScrollY(1500);
      fireEvent.scroll(document);
    });
    expect(button.className).toMatch(/visible/);

    act(() => {
      setScrollY(500);
      fireEvent.scroll(document);
    });
    expect(button.className).not.toMatch(/visible/);
  });

  it('should remove scroll event listener when unmounted to prevent memory leaks', () => {
    const removeSpy = jest.spyOn(document, 'removeEventListener');
    const { unmount } = render(<ToTopButton />);

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeSpy.mockRestore();
  });

  it('should call window.scrollTo when clicked', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    render(<ToTopButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0 });
    scrollToSpy.mockRestore();
  });
});
