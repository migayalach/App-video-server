import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { RefreshTokenGuard } from './refresh-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({ type: RefreshTokenDto, description: 'Token creation.' })
  @ApiResponse({
    status: 400,
    description: 'Resource not found',
    content: {
      'application/json': {
        examples: {
          requestName: {
            summary: 'The "idUser" field is required.',
            value: {
              statusCode: 400,
              message: 'The "idUser" field is required.',
            },
          },
          requestEmail: {
            summary: 'The "refreshToken" field is required.',
            value: {
              statusCode: 400,
              message: 'The "refreshToken" field is required.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Error with refresh token.',
    content: {
      'application/json': {
        examples: {
          requestName: {
            summary: 'Sorry, this token is expired, please initiate session.',
            value: {
              statusCode: 404,
              message: 'Sorry, this token is expired, please initiate session.',
            },
          },
          requestEmail: {
            summary: 'User not found.',
            value: {
              statusCode: 404,
              message: 'User not found.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while processing the request.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while processing the request.',
      },
    },
  })
  async create(@Body() userInfo: RefreshTokenDto) {
    return await this.authService.refreshToken(userInfo);
  }
}
