import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { VideoState } from 'src/enums/video.enum';

@Schema()
export class Video extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  idUser: Types.ObjectId;

  @Prop({ required: true, unique: true })
  nameVideo: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ default: VideoState.Publish })
  stateVideo: VideoState;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
