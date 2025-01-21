import { FollowMiddleware } from './follow.middleware';

describe('FollowMiddleware', () => {
  it('should be defined', () => {
    expect(new FollowMiddleware()).toBeDefined();
  });
});
