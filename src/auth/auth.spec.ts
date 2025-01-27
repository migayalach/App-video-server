import { AuthToken } from './authToken';

describe('Auth', () => {
  it('should be defined', () => {
    expect(new AuthToken()).toBeDefined();
  });
});
