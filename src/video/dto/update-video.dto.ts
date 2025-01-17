import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { VideoState } from 'src/enums/video.enum';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  nameVideo: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEnum(VideoState)
  @IsNotEmpty()
  stateVideo: VideoState;
}
