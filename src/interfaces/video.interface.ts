import { ObjectId } from 'mongoose';
import { VideoState } from 'src/enums/video.enum';

export interface VideoResponse {
  message: string;
  video: VideoData;
}

export interface VideoResponseDelelete {
  message: string;
  video: OneVideoResponse;
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

export interface VideoFilters extends VideoData {
  dateCreate: Date;
}

export interface VideoInfo {
  _id: string | ObjectId | unknown;
  idUser: string | ObjectId;
  nameVideo: string;
  description: string;
  url: string;
  stateVideo: VideoState;
  dateCreate: Date;
  isDelete: boolean | string;
}

export interface OneVideoResponse {
  idVideo: string;
  idUser: string;
  idRanking: string;
  nameVideo: string;
  description: string;
  url: string;
  stateVideo: VideoState;
  dateCreate: Date;
  average: number;
  isDelete: boolean | string;
}

export interface ListVideosSeeders {
  name: string;
  description: string;
  url: string;
}
