import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { Follow } from 'src/enums/follow.enum';

export class CreateFollowDto {
  @ApiProperty({
    description:
      'Unique identifier of the user who is performing the follow action.',
    example: '6787c164d67c1c00e1758f98',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  idUser: Types.ObjectId;

  @ApiProperty({
    description:
      'Unique identifier of the creator being followed or unfollowed.',
    example: '6787c164d67c1c00e1758f98',
    type: String,
  })
  @IsMongoId()
  @IsNotEmpty()
  idCreador: Types.ObjectId;

  @ApiProperty({
    description:
      'Action to perform: "Adding" to follow or "Delete" to unfollow.',
    examples: {
      follow: {
        summary: 'Follow a creator',
        value: 'Adding',
      },
      unfollow: {
        summary: 'Unfollow a creator',
        value: 'Delete',
      },
    },
    enum: Follow,
  })
  @IsNotEmpty()
  @IsEnum(Follow)
  option: Follow;
}
