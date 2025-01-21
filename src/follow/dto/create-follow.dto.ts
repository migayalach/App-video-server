import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Follow } from 'src/enums/follow.enum';

export class CreateFollowDto {
  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  idCreador: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(Follow)
  option: Follow;
}
