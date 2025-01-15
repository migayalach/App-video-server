import { info } from './info.util';
import { results } from './results.util';

export const response = (data: Array<object>, page: number, site: string) => {
  if (!data.length) {
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
  }
  return {
    info: info(data, page, site),
    results: results(data, page),
  };
};
