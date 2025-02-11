import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { rankingResponseUpdate } from 'src/interfaces/ranking.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  // !CREATE RANKING
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create new ranking' })
  @ApiResponse({
    status: 201,
    description: 'Video successfully created',
    schema: {
      example: {
        message: `Create successfully.`,
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
            summary: 'The "idUser" field is required.',
            value: {
              statusCode: 400,
              message: 'The "idUser" field is required.',
            },
          },
          requestIdideo: {
            summary: 'The "idVideo" field is required.',
            value: {
              statusCode: 400,
              message: 'The "idVideo" field is required.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while creating the ranking.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while creating the ranking.',
      },
    },
  })
  async create(
    @Body() createRankingDto: CreateRankingDto,
  ): Promise<{ message: string }> {
    return await this.rankingService.create(createRankingDto);
  }

  // !UPDATE RANKING
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':idRanking')
  @ApiOperation({ summary: 'Update video rating.' })
  @ApiParam({
    name: 'idRanking',
    description:
      "'idRanking' parameter to search the database and get all data.",
    type: String,
    example: '678a6dba8a7eca155cebab3a',
  })
  @ApiResponse({
    status: 200,
    description: 'Video successfully created',
    schema: {
      example: {
        message: 'Registered ranking.',
        average: 3,
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
            summary: 'The "idUser" field is required.',
            value: {
              statusCode: 400,
              message: 'The "idUser" field is required.',
            },
          },
          requestQualification: {
            summary: 'The minimum rating is 0 and the maximum rating is 5.',
            value: {
              statusCode: 400,
              message: 'The minimum rating is 0 and the maximum rating is 5.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while updating the ranking.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while updating the ranking.',
      },
    },
  })
  async update(
    @Param('idRanking') idRanking: string,
    @Body() updateRankingDto: UpdateRankingDto,
  ): Promise<rankingResponseUpdate> {
    return await this.rankingService.update(idRanking, updateRankingDto);
  }
}
