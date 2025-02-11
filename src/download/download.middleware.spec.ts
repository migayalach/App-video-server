import { DownloadMiddleware } from './download.middleware';

describe('DownloadMiddleware', () => {
  it('should be defined', () => {
    expect(new DownloadMiddleware()).toBeDefined();
  });
});
