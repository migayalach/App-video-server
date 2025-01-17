import { LikeMiddleware } from './like.middleware';

describe('LikeMiddleware', () => {
  it('should be defined', () => {
    expect(new LikeMiddleware()).toBeDefined();
  });
});
