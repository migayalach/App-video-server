import { Follow } from 'src/enums/follow.enum';
import { VideoState } from 'src/enums/video.enum';

export interface UserRequestBody {
  name: string;
  email: string;
  password?: string;
}

export interface VideoReqBodyPost {
  idUser: string;
  nameVideo: string;
  url: string;
}

export interface VideoReqBodyPatch {
  idUser: string;
  nameVideo: string;
  url: string;
  stateVideo: VideoState;
}

export interface FollowReqBody {
  idUser: string;
  idCreador: string;
  option: Follow;
}

export interface LoginData {
  email: string;
  password: string;
}
