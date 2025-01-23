import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FollowResponse } from 'src/interfaces/follow.interface';
import { Response } from 'src/interfaces/response.interface';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  //!GET ALL FOLLOWERS
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
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [
          {
            idUser: '6787c148d67c1c00e1758f8c',
            name: 'Carlos',
            email: 'carlos.ramirez@example.com',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this user doesn't exists.",
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while searching for the video.',
  })
  async findAll(
    @Param('idUser') idUser: string,
    @Query('page') page: string,
  ): Promise<Response> {
    return await this.followService.findAll(idUser, +page);
  }

  //!CREATE FOLLOW AND UNFOLLOW CREATOR
  @Post()
  @ApiOperation({ summary: 'Follow or Unfollow user' })
  @ApiResponse({
    status: 200,
    description: 'Response follor or Unfollow user',
    content: {
      'application/json': {
        examples: {
          userNotFound: {
            summary: 'Follow this channel',
            value: {
              message: 'Follow this channel',
              creator: {
                idUser: '6787c154d67c1c00e1758f90',
                name: 'Ana',
                email: 'ana.lopez@example.com',
              },
            },
          },
          videoRepeat: {
            summary: 'Unfollow this channel',
            value: {
              message: 'Unfollow this channel',
              creator: {
                idUser: '6787c154d67c1c00e1758f90',
                name: 'Ana',
                email: 'ana.lopez@example.com',
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this user don't exists",
  })
  @ApiResponse({
    status: 409,
    description: 'Sorry, you are already following this creator',
  })
  async create(@Body() dataFollow: CreateFollowDto): Promise<FollowResponse> {
    return await this.followService.create(dataFollow);
  }
}
