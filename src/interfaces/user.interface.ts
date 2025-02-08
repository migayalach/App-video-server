import { ObjectId } from 'mongoose';

export interface UserDelete {
  message: string;
}

export interface UserData {
  idUser: string | ObjectId;
  name: string;
  email: string;
  picture: string;
  follow: Array<CreatorData> | [];
}

export interface TokenUser {
  access_token: string;
  refresh_token: string;
}

export interface UserCreated {
  message: string;
  user: UserData;
  token: TokenUser;
}

export interface UserUpdate {
  message: string;
  user: UserData;
}

export interface ExistEmail extends UserData, TokenUser {}

export interface CreatorData {
  idCreator: string;
  nameCreator: string;
  pictureCreator: string;
}
