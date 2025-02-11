import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRankingDto {
  @ApiProperty({
    description: 'Unique identifier of the user who is uploading the user.',
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
}
