import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'The name of the user', example: 'Nicolas' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'nicolasMiau@example.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;
}
