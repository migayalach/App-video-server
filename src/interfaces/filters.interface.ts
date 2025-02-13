import { ObjectId } from 'mongoose';
import { AuditState } from 'src/enums/audit.enum';
import { OrderFilters } from 'src/enums/filters.enum';
import { VideoDelete } from 'src/enums/video.enum';

export interface VideoQuery {
  isDelete: { $ne: VideoDelete };
  dateCreate?: {
    $gte?: Date;
    $lte?: Date;
  };
}

export interface OptionsFilters {
  idUser?: string | ObjectId;
  action?: AuditState;
  dateStart?: Date;
  dateEnd?: Date;
  order?: OrderFilters;
  key?: string;
}

export interface QueryAudit {
  idUser: string | ObjectId;
  action?: AuditState;
  timeChanges?: string | { $gte?: Date; $lte?: Date };
}
