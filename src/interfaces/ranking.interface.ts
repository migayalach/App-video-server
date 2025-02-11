import { ObjectId } from 'mongoose';

export interface rankingResponseUpdate {
  message: string;
  average: number;
}

export interface GetIdRanking {
  _id: string | ObjectId;
  average: number;
}
