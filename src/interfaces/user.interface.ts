import { ObjectId } from 'mongoose';

export interface UserResponse {
  message: string;
  user: UserData;
}

export interface UserData {
  idUser: string | ObjectId;
  name: string;
  email: string;
}
