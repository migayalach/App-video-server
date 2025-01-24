import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from 'src/interfaces/login.interface';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: 'Account Access' })
  @ApiResponse({
    status: 201,
    description: 'Access successfully',
    schema: {
      example: {
        access: true,
        idUser: '678e730e45b56f4dad365a3c',
        nameUser: 'Nicolas',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Resource not found',
    content: {
      'application/json': {
        examples: {
          userNotFound: {
            summary: 'Email is not valid.',
            value: {
              statusCode: 404,
              message: 'Sorry, the email is not valid.',
            },
          },
          nameConflict: {
            summary: 'Password is not valid.',
            value: {
              statusCode: 404,
              message: 'Sorry, the password is not valid.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while searching for the user.',
  })
  async create(@Body() infoLogin: LoginDto): Promise<LoginResponse> {
    return await this.loginService.create(infoLogin);
  }
}
