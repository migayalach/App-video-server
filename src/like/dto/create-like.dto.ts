import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLikeDto {
  @ApiProperty({
    description: 'Unique identifier of the user who liked the video.',
    example: '6787c164d67c1c00e1758f98',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @ApiProperty({
    description: 'Unique identifier of the video that was liked.',
    example: '678d123a954eefc016e2ccea',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  idVideo: Types.ObjectId;
}
