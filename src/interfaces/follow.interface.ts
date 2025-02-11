import { ObjectId } from 'mongoose';

export interface ChannelUser {
  idUser: string | ObjectId;
  name: string;
  email: string;
  picture: string;
}

export interface FollowResponse {
  message: string;
  creator: ChannelUser;
}
