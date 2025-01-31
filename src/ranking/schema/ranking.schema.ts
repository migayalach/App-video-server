import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Vote, VoteSchema } from './vote.schema';

@Schema()
export class Ranking extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Video' })
  idVideo: Types.ObjectId;

  @Prop({ type: [VoteSchema], default: [] })
  listVotes: Vote[];

  @Prop({ default: 0 })
  average: number;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking);
