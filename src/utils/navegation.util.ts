import { NextPrev } from 'src/interfaces/response.interface';
import * as dotenv from 'dotenv';
dotenv.config();
const URL_SERVER = process.env.URL_SERVER;

const nextRequest = (
  pages: number,
  page: number,
  site: string,
): string | null => {
  if (page < pages) {
    return `${URL_SERVER}${site}page=${+page + 1}`;
  }
  return null;
};

const prevRequest = (page: number, site: string): string | null => {
  if (+page === 1) {
    return null;
  }
  return `${URL_SERVER}${site}page=${+page - 1}`;
};

export const navegation = (
  pages: number,
  page: number,
  site: string,
): NextPrev => {
  return {
    next: nextRequest(pages, page, site),
    prev: prevRequest(page, site),
  };
};
