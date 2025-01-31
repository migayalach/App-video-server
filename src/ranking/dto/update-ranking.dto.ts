import { PartialType } from '@nestjs/swagger';
import { CreateRankingDto } from './create-ranking.dto';
import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateRankingDto extends PartialType(CreateRankingDto) {
  @IsMongoId()
  @IsNotEmpty()
  idRanking: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @Transform(({ value }) => Number(value))
  @Min(0)
  @Max(5)
  @IsNumber()
  qualification: number;
}
