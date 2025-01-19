import { ObjectId } from 'mongoose';
import { VideoState } from 'src/enums/video.enum';

export interface VideoResponse {
  message: string;
  video: VideoData;
}

export interface VideoData {
  idVideo: string | ObjectId;
  idUser: string | ObjectId;
  nameVideo: string;
  description: string;
  url: string;
  stateVideo: VideoState;
  dateCreate: Date;
}
