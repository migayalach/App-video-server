import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'The "id" of the user',
    example: '678726a888a21c3097b5c5d1',
  })
  @IsString()
  @IsNotEmpty()
  idUser: string;

  @ApiProperty({
    description: 'The token access of the user',
    example: '123aaa456.xxx789zzz.mmmnnn1010',
  })
  @IsString()
  refreshToken: string;
}
