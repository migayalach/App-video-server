import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateVideoDto {
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
    example: 'Gnarls Barkley Crazy',
  })
  @IsString()
  @IsNotEmpty()
  nameVideo: string;

  @ApiProperty({
    description: 'A brief description of the video content (optional).',
    example:
      'Disfruten y alucinen de esta versión de Crazy cantada por Cee Lo Green, en el grupo Gnarls Barkley junto a Danger Mouse. Esta canción fue clasificada como la mejor de la decada 2000-2009 y esta en el lugar 100 de toda la historia, esto por la revista Rolling Stone.',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'The URL where the video is hosted.',
    example:
      'https://www.youtube.com/watch?v=S8EX1taYL40&list=RDS8EX1taYL40&start_radio=1',
  })
  @IsString()
  @IsNotEmpty()
  url: string;
}
