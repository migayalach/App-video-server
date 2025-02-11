import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { FollowResponse } from 'src/interfaces/follow.interface';
import { Response } from 'src/interfaces/response.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  //!GET ALL FOLLOWERS
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':idUser')
  @ApiOperation({ summary: 'Get the list follow of users' })
  @ApiParam({
    name: 'idUser',
    description: "'idUser' parameter to search the database and get all data.",
    type: String,
    example: '6787c164d67c1c00e1758f98',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User follow creators pagination and response',
    schema: {
      example: {
        info: {
          count: 2,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [
          {
            idUser: '6787c148d67c1c00e1758f8c',
            name: 'Carlos',
            email: 'carlos.ramirez@example.com',
            picture: 'Image URL',
          },
          {
            idUser: '67a642f1125b750bb327f491',
            name: 'Rafael',
            email: 'rafa@example.com',
            picture: 'Image URL',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this user doesn't exists.",
    schema: {
      example: {
        status: 404,
        message: "Sorry, this user doesn't exists.",
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while retrieving the user data.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while retrieving the user data.',
      },
    },
  })
  async findAll(
    @Param('idUser') idUser: string,
    @Query('page') page: string,
  ): Promise<Response> {
    return await this.followService.findAll(idUser, +page);
  }

  //!CREATE FOLLOW AND UNFOLLOW CREATOR
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Follow or Unfollow creator.' })
  @ApiResponse({
    status: 201,
    description: 'Response follor or Unfollow user',
    content: {
      'application/json': {
        examples: {
          userNotFound: {
            summary: 'Follow this channel',
            value: {
              message: 'Follow this channel',
              creator: {
                idUser: '67a59bbb19787fd8a0f6c87e',
                name: 'Angela',
                email: 'angela@example.com',
                picture: 'Image URL',
              },
            },
          },
          videoRepeat: {
            summary: 'Unfollow this channel',
            value: {
              message: 'Unfollow this channel',
              creator: {
                idUser: '67a59bbb19787fd8a0f6c87e',
                name: 'Angela',
                email: 'angela@example.com',
                picture: 'Image URL',
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Resource not found',
    content: {
      'application/json': {
        examples: {
          requestIdUser: {
            summary: '"idUser" is required.',
            value: {
              statusCode: 400,
              message: '"idUser" is required.',
            },
          },
          requestIdCreator: {
            summary: '"idCreator" is required.',
            value: {
              statusCode: 400,
              message: '"idCreator" is required.',
            },
          },
          AddingOrDelete: {
            summary: '"Option" must be either "Adding" or "Delete".',
            value: {
              statusCode: 400,
              message: '"Option" must be either "Adding" or "Delete".',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this user doesn't exists.",
    schema: {
      example: {
        status: 404,
        message: "Sorry, this user doesn't exists.",
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Sorry, you are already following this creator',
    schema: {
      example: {
        status: 409,
        message: 'Sorry, you are already following this creator',
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
  async create(@Body() dataFollow: CreateFollowDto): Promise<FollowResponse> {
    return await this.followService.create(dataFollow);
  }
}
