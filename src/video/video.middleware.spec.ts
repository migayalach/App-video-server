import { VideoMiddleware } from './video.middleware';

describe('VideoMiddleware', () => {
  it('should be defined', () => {
    expect(new VideoMiddleware()).toBeDefined();
  });
});
