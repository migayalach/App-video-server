import { ObjectId } from 'mongoose';
import { OneVideoResponse } from './video.interface';

export interface LikeResponseGetAll {
  idLike: string | ObjectId;
  video: OneVideoResponse;
}
