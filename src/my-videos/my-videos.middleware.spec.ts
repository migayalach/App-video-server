import { MyVideosMiddleware } from './my-videos.middleware';

describe('MyVideosMiddleware', () => {
  it('should be defined', () => {
    expect(new MyVideosMiddleware()).toBeDefined();
  });
});
