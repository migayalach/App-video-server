import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';
import { AuditState } from 'src/enums/audit.enum';

export class CreateAuditDto {
  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  idVideo: Types.ObjectId;

  @IsEnum(AuditState)
  action: AuditState;

  @IsObject()
  @IsOptional()
  changes?: Record<string, any>;
}
