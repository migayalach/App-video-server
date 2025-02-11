import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Unique identifier of the user.',
    example: '6787c139d67c1c00e1758f88',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @ApiProperty({
    description: 'Unique identifier of the user who is uploading the video.',
    example: '6787c139d67c1c00e1758f88',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  idVideo: Types.ObjectId;

  @ApiProperty({
    description: 'The action performed in the audit.',
    enum: AuditState,
    example: AuditState.Create,
  })
  @IsEnum(AuditState)
  action: AuditState;

  @ApiProperty({
    description: 'Optional field to store changes made during the audit.',
    required: false,
    type: Object,
  })
  @IsObject()
  @IsOptional()
  changes?: Record<string, any>;
}
