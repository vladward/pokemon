import { fireEvent, render, screen } from '@testing-library/react';

import { useSearchParams } from 'next/navigation';

import { Pagination } from './Pagination';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.Mock;

const makeSearchParams = (params: Record<string, string> = {}) => {
  const sp = new URLSearchParams(params);
  return { get: (k: string) => sp.get(k), toString: () => sp.toString() };
};

const getCalledParams = () =>
  new URLSearchParams((mockPush.mock.calls[0][0] as string).slice(1));

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchParams.mockReturnValue(makeSearchParams({ page: '1' }));
  });

  describe('visibility', () => {
    it('does not render when totalPages = 1', () => {
      const { container } = render(<Pagination page={1} totalPages={1} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('does not render when totalPages = 0', () => {
      const { container } = render(<Pagination page={1} totalPages={0} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders when totalPages >= 2', () => {
      render(<Pagination page={1} totalPages={2} />);
      expect(screen.getByText('←')).toBeInTheDocument();
    });
  });

  describe('page range', () => {
    it('shows all pages when totalPages <= 7', () => {
      render(<Pagination page={1} totalPages={7} />);
      [1, 2, 3, 4, 5, 6, 7].forEach((n) =>
        expect(screen.getByText(String(n))).toBeInTheDocument(),
      );
      expect(screen.queryByText('…')).not.toBeInTheDocument();
    });

    it('shows ellipsis when pages > 7', () => {
      render(<Pagination page={5} totalPages={10} />);
      expect(screen.getAllByText('…').length).toBeGreaterThanOrEqual(1);
    });

    it('always shows the first page for large page count', () => {
      render(<Pagination page={8} totalPages={15} />);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('always shows the last page for large page count', () => {
      render(<Pagination page={3} totalPages={15} />);
      expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('shows pages around the current one', () => {
      render(<Pagination page={5} totalPages={10} />);
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('ellipsis is a span, not a button', () => {
      render(<Pagination page={5} totalPages={10} />);
      const ellipsis = screen.getAllByText('…')[0];
      expect(ellipsis.tagName).toBe('SPAN');
      expect(ellipsis.closest('button')).toBeNull();
    });
  });

  describe('active page', () => {
    it('marks the current page with bg-yellow class', () => {
      render(<Pagination page={2} totalPages={3} />);
      expect(screen.getByText('2').closest('button')).toHaveClass('bg-yellow');
    });

    it('does not mark other pages as active', () => {
      render(<Pagination page={2} totalPages={3} />);
      expect(screen.getByText('1').closest('button')).not.toHaveClass('bg-yellow');
      expect(screen.getByText('3').closest('button')).not.toHaveClass('bg-yellow');
    });
  });

  describe('disabled states', () => {
    it('← is disabled on the first page', () => {
      render(<Pagination page={1} totalPages={5} />);
      expect(screen.getByText('←').tagName).toBe('SPAN');
    });

    it('→ is disabled on the last page', () => {
      render(<Pagination page={5} totalPages={5} />);
      expect(screen.getByText('→').tagName).toBe('SPAN');
    });

    it('← is enabled when not on the first page', () => {
      render(<Pagination page={3} totalPages={5} />);
      expect(screen.getByText('←').tagName).toBe('BUTTON');
    });

    it('→ is enabled when not on the last page', () => {
      render(<Pagination page={3} totalPages={5} />);
      expect(screen.getByText('→').tagName).toBe('BUTTON');
    });
  });

  describe('navigation', () => {
    it('navigates to the next page via →', () => {
      mockUseSearchParams.mockReturnValue(makeSearchParams({ page: '2' }));
      render(<Pagination page={2} totalPages={5} />);
      fireEvent.click(screen.getByText('→'));
      expect(mockPush).toHaveBeenCalledWith('?page=3');
    });

    it('navigates to the previous page via ←', () => {
      mockUseSearchParams.mockReturnValue(makeSearchParams({ page: '3' }));
      render(<Pagination page={3} totalPages={5} />);
      fireEvent.click(screen.getByText('←'));
      expect(mockPush).toHaveBeenCalledWith('?page=2');
    });

    it('navigates to a specific page on click', () => {
      render(<Pagination page={1} totalPages={5} />);
      fireEvent.click(screen.getByText('3'));
      expect(mockPush).toHaveBeenCalledWith('?page=3');
    });

    it('calls router.push exactly once per click', () => {
      render(<Pagination page={1} totalPages={5} />);
      fireEvent.click(screen.getByText('2'));
      expect(mockPush).toHaveBeenCalledTimes(1);
    });

    it('preserves filters in URL when navigating between pages', () => {
      mockUseSearchParams.mockReturnValue(
        makeSearchParams({ types: 'fire', rarity: 'rare', page: '1' }),
      );
      render(<Pagination page={1} totalPages={3} />);
      fireEvent.click(screen.getByText('2'));

      const params = getCalledParams();
      expect(params.get('types')).toBe('fire');
      expect(params.get('rarity')).toBe('rare');
      expect(params.get('page')).toBe('2');
    });

    it('preserves search in URL when navigating between pages', () => {
      mockUseSearchParams.mockReturnValue(
        makeSearchParams({ search: 'pikachu', page: '1' }),
      );
      render(<Pagination page={1} totalPages={3} />);
      fireEvent.click(screen.getByText('→'));

      const params = getCalledParams();
      expect(params.get('search')).toBe('pikachu');
      expect(params.get('page')).toBe('2');
    });
  });
});
