import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateVideoDto {
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
}
