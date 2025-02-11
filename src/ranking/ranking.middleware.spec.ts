import { RankingMiddleware } from './ranking.middleware';

describe('RankingMiddleware', () => {
  it('should be defined', () => {
    expect(new RankingMiddleware()).toBeDefined();
  });
});
