import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
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
  async signIn(@Body() infoLogin: LoginDto) {
    return await this.authService.signIn(infoLogin);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
