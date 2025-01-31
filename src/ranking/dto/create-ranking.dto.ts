import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRankingDto {
  @IsMongoId()
  @IsNotEmpty()
  idVideo: Types.ObjectId;
}
