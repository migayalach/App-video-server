import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  idUser: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
