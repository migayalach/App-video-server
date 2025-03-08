import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { VideoState } from 'src/enums/video.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @ApiProperty({
    description: 'Unique identifier of the user who is uploading the video.',
    example: '6787c139d67c1c00e1758f88',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @ApiProperty({
    description: 'The name or title of the video.',
    example: 'Gnarls Barkley Crazy + Violín',
  })
  @IsString()
  @IsNotEmpty()
  nameVideo: string;

  @ApiProperty({
    description: 'A brief description of the video content (optional).',
    example:
      'Disfruten y alucinen de esta versión de Crazy cantada por Cee Lo Green',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'The URL where the image is hosted.',
    example:
      'https://res.cloudinary.com/dqgcyonb9/image/upload/v1733752729/Ballet/ov9uairpgr9gaut7zkqn.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'The URL where the video is hosted.',
    example:
      'https://www.youtube.com/watch?v=S8EX1taYL40&list=RDS8EX1taYL40&start_radio=1',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'The current state of the video, such as published or draft.',
    examples: {
      follow: {
        summary: 'Publish a video',
        value: 'true',
      },
      unfollow: {
        summary: 'Unpublish a video',
        value: 'true',
      },
    },
    enum: VideoState,
  })
  @IsNotEmpty()
  stateVideo: boolean;
}
