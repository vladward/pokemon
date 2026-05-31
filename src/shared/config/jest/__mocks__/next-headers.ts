export const cookies = jest.fn(() =>
  Promise.resolve({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  }),
);
export const headers = jest.fn(() => new Map());
