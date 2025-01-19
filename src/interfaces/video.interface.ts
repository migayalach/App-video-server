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

export interface VideoInfo {
  _id: string | ObjectId;
  idUser: string | ObjectId;
  nameVideo: string;
  description: string;
  url: string;
  stateVideo: VideoState;
  dateCreate: Date;
}

export interface VideoResponseClear {
  idVideo: string;
  idUser: string;
  nameVideo: string;
  description: string;
  url: string;
  stateVideo: VideoState;
  dateCreate: Date;
}
