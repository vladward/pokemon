import { act, renderHook } from '@testing-library/react';

import { useMultiSelectDraft } from './useMultiSelectDraft';

describe('useMultiSelectDraft', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('initializes draft from values', () => {
    const { result } = renderHook(() => useMultiSelectDraft(['fire', 'water'], jest.fn()));
    expect(result.current.draft).toEqual(['fire', 'water']);
  });

  it('toggle adds a value to draft immediately', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useMultiSelectDraft([], onChange));

    act(() => result.current.toggle('fire'));

    expect(result.current.draft).toEqual(['fire']);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('toggle removes an existing value from draft immediately', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useMultiSelectDraft(['fire'], onChange));

    act(() => result.current.toggle('fire'));

    expect(result.current.draft).toEqual([]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange after 800ms', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useMultiSelectDraft([], onChange));

    act(() => result.current.toggle('fire'));
    expect(onChange).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(1200));
    expect(onChange).toHaveBeenCalledWith(['fire']);
  });

  it('debounces rapid clicks into a single onChange call', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useMultiSelectDraft([], onChange));

    act(() => result.current.toggle('fire'));
    act(() => jest.advanceTimersByTime(400));
    act(() => result.current.toggle('water'));
    act(() => jest.advanceTimersByTime(1200));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['fire', 'water']);
  });

  it('syncs draft from values when closed', () => {
    const onChange = jest.fn();
    let values = ['fire'];
    const { result, rerender } = renderHook(() => useMultiSelectDraft(values, onChange));

    values = [];
    rerender();

    expect(result.current.draft).toEqual([]);
  });

  it('does not sync draft from values while open', () => {
    const onChange = jest.fn();
    let values: string[] = [];
    const { result, rerender } = renderHook(() => useMultiSelectDraft(values, onChange));

    act(() => result.current.setOpen(true));
    act(() => result.current.toggle('fire'));

    values = ['water'];
    rerender();

    expect(result.current.draft).toEqual(['fire']);
  });

  it('clears pending debounce on unmount', () => {
    const onChange = jest.fn();
    const { result, unmount } = renderHook(() => useMultiSelectDraft([], onChange));

    act(() => result.current.toggle('fire'));
    unmount();
    act(() => jest.advanceTimersByTime(1200));

    expect(onChange).not.toHaveBeenCalled();
  });
});
