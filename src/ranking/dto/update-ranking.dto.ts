import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateRankingDto } from './create-ranking.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRankingDto extends PartialType(CreateRankingDto) {
  @ApiProperty({
    description: 'Unique identifier of the user who is uploading the user.',
    example: '6787c139d67c1c00e1758f88',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @ApiProperty({
    description:
      'User qualification for the ranking, should be between 0 and 5.',
    example: 4,
    type: Number,
    minimum: 0,
    maximum: 5,
  })
  @Transform(({ value }) => Number(value))
  @Min(0)
  @Max(5)
  @IsNumber()
  qualification: number;
}
