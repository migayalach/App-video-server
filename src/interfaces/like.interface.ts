import { ObjectId } from 'mongoose';
import { VideoInfo } from './video.interface';

export interface LikeResponseGetAll {
  idLike: string | ObjectId;
  video: VideoInfo;
}
