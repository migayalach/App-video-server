import { Controller, Get, Query } from '@nestjs/common';
import { DownloadService } from './download.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get()
  @ApiOperation({ summary: 'Download video or mp3' })
  @ApiQuery({
    name: 'url',
    required: true,
    description: 'The URL of the video to be downloaded.',
    type: String,
    example: 'https://www.youtube.com/watch?v=5Vh1IngjcLA',
  })
  @ApiQuery({
    name: 'quality',
    required: true,
    description:
      'The desired quality of the download. For video: 144p, 360p, 480p, 720p, 1080p. For audio: low, high, best.',
    type: String,
    example: '720p',
  })
  @ApiQuery({
    name: 'format',
    required: true,
    description:
      'The format of the download. Available options: mp4 (video), mp3 (audio).',
    type: String,
    example: 'mp4',
  })
  @ApiResponse({
    status: 200,
    description: 'Download successfully.',
    schema: {
      example: {
        message: 'Download successfully.',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Resource not found',
    content: {
      'application/json': {
        examples: {
          requestURL: {
            summary: 'Very short url.',
            value: {
              statusCode: 400,
              message: 'Very short url.',
            },
          },
          requestFormat: {
            summary: 'Format is not available at the moment.',
            value: {
              statusCode: 400,
              message: 'Format is not available at the moment.',
            },
          },
          requestQuality: {
            summary: 'Quality is not available at the moment.',
            value: {
              statusCode: 400,
              message: 'Quality is not available at the moment.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error downloading the file.',
    schema: {
      example: {
        status: 500,
        message: 'Error downloading the file.',
      },
    },
  })
  async download(
    @Query('url') url: string,
    @Query('quality') quality: string,
    @Query('format') format: string,
  ): Promise<{ message: string }> {
    return await this.downloadService.downloadVideo(url, quality, format);
  }
}
