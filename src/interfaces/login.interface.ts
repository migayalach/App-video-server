import { ObjectId } from 'mongoose';

export interface LoginResponse {
  access: boolean;
  idUser: string | ObjectId;
  nameUser: string;
}
