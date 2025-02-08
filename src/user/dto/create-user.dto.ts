import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user', example: 'Nicolas' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'nicolasMiau@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'NIcomIAU*123@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Photo profile of the user',
    example:
      'https://res.cloudinary.com/dqgcyonb9/image/upload/v1729104650/Ballet/rlcc22yrzuqmnbxqxbo4.png',
  })
  @IsString()
  @IsOptional()
  picture?: string;
}
