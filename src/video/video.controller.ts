import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {
  OneVideoResponse,
  VideoResponse,
} from 'src/interfaces/video.interface';
import { Response } from 'src/interfaces/response.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  //!CREATE VIDEO
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create new video' })
  @ApiResponse({
    status: 201,
    description: 'Video successfully created',
    schema: {
      example: {
        message: 'Video created successfully',
        video: {
          idVideo: '6791080aae04e23627f48883',
          idUser: '6787c185d67c1c00e1758fa8',
          nameVideo:
            'EVO MORALES al BORDE de la PRISIÓN por CULPA de INFLUENCERS AMIGOS DE MICHELO',
          description:
            "EVO MORALES AL BORDE DE LA PRISIÓN POR CULPA DE INFLUENCERS AMIGOS DE MICHELO Copyright'",
          url: 'https://www.youtube.com/watch?v=xwO9zod--lc',
          stateVideo: 'true',
          dateCreate: '2025-01-22T15:00:26.866Z',
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
          requestName: {
            summary: 'The "idUser" field is required.',
            value: {
              statusCode: 400,
              message: "The 'name' field is required.",
            },
          },
          requestEmail: {
            summary: 'The "nameVideo" field is required.',
            value: {
              statusCode: 400,
              message: 'The "nameVideo" field is required.',
            },
          },
          requestuRL: {
            summary: 'The "url" field is required.',
            value: {
              statusCode: 400,
              message: 'The "url" field is required.',
            },
          },
        },
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
            summary: `Sorry, this user doesn't exists.`,
            value: { status: 404, message: `Sorry, this user doesn't exists.` },
          },
          nameConflict: {
            summary: `Sorry this name or url currently exists.`,
            value: {
              status: 404,
              message: `Sorry this name or url currently exists.`,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while creating the video.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while creating the video.',
      },
    },
  })
  async create(@Body() infoVideo: CreateVideoDto): Promise<VideoResponse> {
    return await this.videoService.create(infoVideo);
  }

  //!GET ALL VIDEO
  @Get()
  @ApiOperation({ summary: 'Get list video' })
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
          count: 27,
          pages: 2,
          next: 'http://localhost:3001/app-video/video?page=2',
          prev: null,
        },
        results: [
          {
            idVideo: '678bb8a77af7099136efd0d9',
            idUser: '678726a888a21c3097b5c5d1',
            nameVideo:
              'JACOB FATU TRACIONARÁ a SOLO para ser JEFE TRIBAL? 😨 - ALTOS y BAJOS SMACKDOWN',
            description:
              'Conviértete en MIEMBRO y se parte de los SEXY BOYS del Canal 🥰',
            url: 'https://www.youtube.com/watch?v=b3V4cddqzUI',
            stateVideo: 'true',
            dateCreate: '2025-01-18T14:20:23.258Z',
          },
          {
            idVideo: '678c66b72be91f8d33f3459a',
            idUser: '6787c185d67c1c00e1758fa8',
            nameVideo:
              'Canción del episodio 5 del Juego del Calamar 2 | Shin Hae Chul - To You (그대에게) | Letra en Español',
            description:
              "Pentatlon juego del calamar 2, episodio 5, juego 2, segundo juego del juego del calamar 2, español, letra, lyrics, sub español, Canción del episodio 6 del Juego del Calamar 2 🦑 | 둥글게 둥글게 | Letra en Español letra en español, Squid Game 2 Episode 6 Mingle Game Song Extended, Mingle Game Song With Lyrics | Round and Round | Full Version Soundtrack | Squid Game | Season 2, Korean Children's Songs – 둥글게 둥글게",
            url: 'https://www.youtube.com/watch?v=018i4yOFf-s',
            stateVideo: 'true',
            dateCreate: '2025-01-19T02:43:03.565Z',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An error occurred while retrieving videos',
    schema: {
      example: {
        status: 500,
        message: 'An error occurred while retrieving videos',
      },
    },
  })
  async findAll(@Query('page') page: string): Promise<Response> {
    return await this.videoService.findAll(+page);
  }

  //!GET ID VIDEO
  @Get(':idVideo')
  @ApiOperation({ summary: 'Get video information' })
  @ApiParam({
    name: 'idVideo',
    description: "'idVideo' parameter to search the database and get all data.",
    type: String,
    example: '678a6dba8a7eca155cebab3a',
  })
  @ApiResponse({
    status: 201,
    description: 'The video has been obtained successfully',
    schema: {
      example: {
        idVideo: '678a6dba8a7eca155cebab3a',
        idUser: '678726a888a21c3097b5c5d1',
        nameVideo: 'My video XD',
        description: 'Holis mundo',
        url: 'https://www.youtube.com/watch?v=L2UA8aUmw4k',
        stateVideo: 'false',
        dateCreate: '2025-01-17T14:48:26.821Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Video not found.',
    schema: {
      example: {
        status: 404,
        message: 'Video not found.',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An error occurred while retrieving the video.',
    schema: {
      example: {
        status: 500,
        message: 'An error occurred while retrieving the video',
      },
    },
  })
  async findOne(@Param('idVideo') idVideo: string): Promise<OneVideoResponse> {
    return await this.videoService.findOne(idVideo);
  }

  //!UPDATE VIDEO
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':idVideo')
  @ApiOperation({ summary: 'Update information video' })
  @ApiParam({
    name: 'idVideo',
    description: "'idVideo' parameter to search the database and get data.",
    type: String,
    example: '678a6dba8a7eca155cebab3a',
  })
  @ApiResponse({
    status: 200,
    description: 'Video successfully updated',
    schema: {
      example: {
        message: 'User updated successfully',
        video: {
          idVideo: '678a6dba8a7eca155cebab3a',
          idUser: '678726a888a21c3097b5c5d1',
          nameVideo: 'My video',
          description: 'Holis mundo',
          url: 'https://www.youtube.com/watch?v=L2UA8aUmw4k',
          stateVideo: 'true',
          dateCreate: '2025-01-17T14:48:26.821Z',
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
          requestName: {
            summary: 'The "idUser" field is required.',
            value: {
              statusCode: 400,
              message: "The 'name' field is required.",
            },
          },
          requestEmail: {
            summary: 'The "nameVideo" field is required.',
            value: {
              statusCode: 400,
              message: 'The "nameVideo" field is required.',
            },
          },
          requestUrl: {
            summary: 'The "url" field is required.',
            value: {
              statusCode: 400,
              message: 'The "url" field is required.',
            },
          },
          requestStatus: {
            summary: 'This state is not valid.',
            value: {
              statusCode: 400,
              message: 'This state is not valid.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Error to update data.',
    content: {
      'application/json': {
        examples: {
          requestName: {
            summary: 'No changes detected, update not applied',
            value: {
              statusCode: 404,
              message: 'No changes detected, update not applied',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'No changes detected, update not applied',
    schema: {
      example: {
        status: 500,
        message: 'No changes detected, update not applied',
      },
    },
  })
  async update(
    @Param('idVideo') idVideo: string,
    @Body() infoVideo: UpdateVideoDto,
  ): Promise<VideoResponse> {
    return await this.videoService.update(idVideo, infoVideo);
  }

  //!DELETE VIDEO
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':idVideo')
  @ApiOperation({ summary: 'Delete video information' })
  @ApiParam({
    name: 'idVideo',
    description:
      "'idVideo' parameter to search the database and get data and delete video.",
    type: String,
    example: '678a6dba8a7eca155cebab3a',
  })
  @ApiResponse({
    status: 200,
    description: 'Video successfully delete',
    schema: {
      example: {
        message: 'Video deleted successfully',
        video: {
          idVideo: '6791080aae04e23627f48883',
          idUser: '6787c185d67c1c00e1758fa8',
          nameVideo:
            'EVO MORALES al BORDE de la PRISIÓN por CULPA de INFLUENCERS AMIGOS DE MICHELO',
          description:
            "EVO MORALES AL BORDE DE LA PRISIÓN POR CULPA DE INFLUENCERS AMIGOS DE MICHELO Copyright'",
          url: 'https://www.youtube.com/watch?v=xwO9zod--lc',
          stateVideo: 'true',
          dateCreate: '2025-01-22T15:00:26.866Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'This video has already been deleted',
    schema: {
      example: {
        status: 404,
        message: 'This video has already been deleted',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An error occurred while deleting the video.',
    schema: {
      example: {
        status: 500,
        message: 'An error occurred while deleting the video.',
      },
    },
  })
  async remove(@Param('idVideo') idVideo: string): Promise<VideoResponse> {
    return await this.videoService.remove(idVideo);
  }
}
