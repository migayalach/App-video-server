import { ObjectId } from 'mongodb';
import { AuditState } from 'src/enums/audit.enum';

export interface VideoCreateAudit {
  idUser: string | ObjectId;
  idVideo: string | ObjectId;
  action: AuditState;
  _id: string | ObjectId;
  timeChanges: Date;
  timeOnly: string;
  __v: number;
}

export interface AuditInterface {
  idAudit: string | ObjectId;
  idUser: string | ObjectId;
  idVideo: string | ObjectId;
  action: AuditState;
  timeChanges: Date;
  timeOnly: Date;
}
