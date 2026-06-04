import { act, fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { PokemonSearch } from './PokemonSearch';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.Mock;

const getInput = () => screen.getByPlaceholderText('Search Pokémon...');

describe('PokemonSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/en/pokemon');
  });

  describe('render', () => {
    it('renders the input field', () => {
      render(<PokemonSearch onChange={jest.fn()} />);
      expect(getInput()).toBeInTheDocument();
    });

    it('displays the provided value', () => {
      render(
        <PokemonSearch
          value="pikachu"
          onChange={jest.fn()}
        />,
      );
      expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
    });

    it('does not render on pages outside /pokemon', () => {
      mockUsePathname.mockReturnValue('/en/home');
      const { container } = render(<PokemonSearch onChange={jest.fn()} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders on /pokemon with any locale', () => {
      mockUsePathname.mockReturnValue('/ru/pokemon');
      render(<PokemonSearch onChange={jest.fn()} />);
      expect(getInput()).toBeInTheDocument();
    });

    it('renders without a provided value (empty string by default)', () => {
      render(<PokemonSearch onChange={jest.fn()} />);
      expect(getInput()).toHaveValue('');
    });
  });

  describe('debounce', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('input updates immediately without waiting for debounce', () => {
      render(
        <PokemonSearch
          value=""
          onChange={jest.fn()}
        />,
      );

      fireEvent.change(getInput(), { target: { value: 'abc' } });

      expect(getInput()).toHaveValue('abc');
    });

    it('does not call onChange before the delay expires', () => {
      const onChange = jest.fn();
      render(
        <PokemonSearch
          value=""
          onChange={onChange}
        />,
      );

      fireEvent.change(getInput(), { target: { value: 'pika' } });
      act(() => jest.advanceTimersByTime(399));

      expect(onChange).not.toHaveBeenCalledWith('pika');
    });

    it('calls onChange after 400ms delay', () => {
      const onChange = jest.fn();
      render(
        <PokemonSearch
          value=""
          onChange={onChange}
        />,
      );

      fireEvent.change(getInput(), { target: { value: 'pika' } });
      act(() => jest.advanceTimersByTime(400));

      expect(onChange).toHaveBeenCalledWith('pika');
    });

    it('batches multiple keystrokes into a single call', () => {
      const onChange = jest.fn();
      render(
        <PokemonSearch
          value=""
          onChange={onChange}
        />,
      );

      fireEvent.change(getInput(), { target: { value: 'p' } });
      fireEvent.change(getInput(), { target: { value: 'pi' } });
      fireEvent.change(getInput(), { target: { value: 'pik' } });
      fireEvent.change(getInput(), { target: { value: 'pika' } });

      act(() => jest.advanceTimersByTime(400));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('pika');
    });

    it('resets the timer on each new keystroke', () => {
      const onChange = jest.fn();
      render(
        <PokemonSearch
          value=""
          onChange={onChange}
        />,
      );

      fireEvent.change(getInput(), { target: { value: 'pi' } });
      act(() => jest.advanceTimersByTime(300));

      fireEvent.change(getInput(), { target: { value: 'pik' } });
      act(() => jest.advanceTimersByTime(300));

      expect(onChange).not.toHaveBeenCalled();

      act(() => jest.advanceTimersByTime(100));
      expect(onChange).toHaveBeenCalledWith('pik');
    });
  });

  describe('sync with external value', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('does not call onChange when externally reset to undefined (prevents double request)', () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <PokemonSearch
          value="pikachu"
          onChange={onChange}
        />,
      );

      rerender(
        <PokemonSearch
          value={undefined}
          onChange={onChange}
        />,
      );
      act(() => jest.advanceTimersByTime(400));

      expect(onChange).not.toHaveBeenCalledWith('');
    });

    it('updates the field when the external value changes to a new string', () => {
      const { rerender } = render(
        <PokemonSearch
          value="bulbasaur"
          onChange={jest.fn()}
        />,
      );

      rerender(
        <PokemonSearch
          value="charmander"
          onChange={jest.fn()}
        />,
      );

      expect(getInput()).toHaveValue('charmander');
    });

    it('clears the field when externally reset to undefined', () => {
      const { rerender } = render(
        <PokemonSearch
          value="pikachu"
          onChange={jest.fn()}
        />,
      );

      rerender(
        <PokemonSearch
          value={undefined}
          onChange={jest.fn()}
        />,
      );

      expect(getInput()).toHaveValue('');
    });
  });
});
