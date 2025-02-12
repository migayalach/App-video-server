import { FiltersMiddleware } from './filters.middleware';

describe('FiltersMiddleware', () => {
  it('should be defined', () => {
    expect(new FiltersMiddleware()).toBeDefined();
  });
});
