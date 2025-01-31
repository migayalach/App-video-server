import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Vote {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  idUser: Types.ObjectId;

  @Prop({ required: true })
  qualification: number;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
