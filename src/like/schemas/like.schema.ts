import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Like extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  idUser: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Video', required: true })
  idVideo: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
