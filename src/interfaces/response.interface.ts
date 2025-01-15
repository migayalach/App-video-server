export interface InfoData {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface NextPrev {
  next: string | null;
  prev: string | null;
}

export interface Response {
  info: InfoData;
  results: Array<object>;
}
