import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { AuditState } from 'src/enums/audit.enum';

@Schema()
export class Audit extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  idUser: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Video' })
  idVideo: Types.ObjectId;

  @Prop({ required: true, type: String, enum: Object.values(AuditState) })
  action: AuditState;

  @Prop({ required: true, default: Date.now })
  timeChanges: Date;

  @Prop({ required: true, default: () => new Date().toLocaleTimeString() })
  timeOnly: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  changes: Record<string, any>;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
