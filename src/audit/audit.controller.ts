import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'src/interfaces/response.interface';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':idUser/:idVideo')
  @ApiOperation({ summary: 'Get list audit user' })
  @ApiParam({
    name: 'idUser',
    description:
      'The unique identifier of the user to search the audit records in the database.',
    type: String,
    example: '678a6dba8a7eca155cebab3a',
  })
  @ApiParam({
    name: 'idVideo',
    description:
      'The unique identifier of the video to search the audit records in the database.',
    type: String,
    example: '678a6dba8a7eca155cebab3a',
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
    description: 'Video pagination and response',
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
            _id: '67a58a15c092543d7cc19245',
            idVideo: '67a58a15c092543d7cc19241',
            action: 'Create',
            timeChanges: '2025-02-07T04:20:37.728Z',
            timeOnly: '12:20:37 AM',
          },
          {
            _id: '67a99e33b56b3f0dabfeb937',
            idVideo: '67a58a15c092543d7cc19241',
            action: 'Update',
            changes: {
              nameVideo: {
                before: 'Comodo (Remix) - Oma 206 Ft. Jowell y Randy',
                after: 'Comodo - Oma 206 Ft. Jowell y Randy',
              },
            },
            timeChanges: '2025-02-10T06:35:31.185Z',
            timeOnly: '2:35:31 AM',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Resource not found',
    content: {
      'application/json': {
        examples: {
          requestName: {
            summary: 'The parameter is required.',
            value: {
              statusCode: 400,
              message: 'The parameter is required.',
            },
          },
          requestIdUser: {
            summary: 'Invalid idUser format',
            value: {
              statusCode: 400,
              message: 'Invalid idUser format',
            },
          },
          requestIdVideo: {
            summary: 'Invalid idVideo format',
            value: {
              statusCode: 400,
              message: 'Invalid idVideo format',
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
        error: "Sorry, this user doesn't exists.",
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while creating the audit.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while creating the audit.',
      },
    },
  })
  async findAll(
    @Param('idUser') idUser: string,
    @Param('idVideo') idVideo: string,
    @Query('page') page: string,
  ): Promise<Response> {
    return await this.auditService.findAll(idUser, idVideo, +page);
  }
}
