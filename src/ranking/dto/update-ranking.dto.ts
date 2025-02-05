import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateRankingDto } from './create-ranking.dto';

export class UpdateRankingDto extends PartialType(CreateRankingDto) {
  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @Transform(({ value }) => Number(value))
  @Min(0)
  @Max(5)
  @IsNumber()
  qualification: number;
}
