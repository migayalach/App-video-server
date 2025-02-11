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
          idVideo: '67a97b5cd46682bb947177ee',
          idUser: '67a642f1125b750bb327f491',
          idRanking: '67a97b5cd46682bb947177f0',
          nameVideo: 'El punto débil de Ikki de Fénix ',
          description:
            'Saint Seiya - Los Caballeros del Zodiaco. Kassa de Lymnades (Léunades en Latinoamérica) descubre el punto débil de Ikki antes de morir en el capítulo 107 de la serie.',
          url: 'https://www.youtube.com/watch?v=Deg1wTorIiA',
          stateVideo: 'true',
          dateCreate: '2025-02-10T04:06:52.215Z',
          average: 0,
          isDelete: 'false',
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
            summary: 'The "idUser" field is required.',
            value: {
              statusCode: 400,
              message: "The 'idUser' field is required.",
            },
          },
          requestNameVideo: {
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
            idVideo: '67a58a15c092543d7cc19241',
            idUser: '67a58a15c092543d7cc19231',
            idRanking: '67a58a15c092543d7cc19243',
            nameVideo: 'Comodo (Remix) - Oma 206 Ft. Jowell y Randy',
            description:
              'Directed By Cesar Berrios y Alvaro Diaz Bacon & Soda Films 2013 www.molinarecords.com Twitter/Instagram- @molinarecords Facebook- Molina Records',
            url: 'https://www.youtube.com/watch?v=VK4RcyZS_EE',
            stateVideo: 'true',
            dateCreate: '2025-02-07T04:20:37.715Z',
            average: 0,
            isDelete: 'false',
          },
          {
            idVideo: '67a58a15c092543d7cc19249',
            idUser: '67a58a15c092543d7cc19231',
            idRanking: '67a58a15c092543d7cc1924b',
            nameVideo: 'C-Kan - Vuelve ft. MC Davo (Video Oficial)',
            description:
              'Music video by C-Kan performing Vuelve. 2013 Mastered Trax / C-Mobztas',
            url: 'https://www.youtube.com/watch?v=7bPAJgVRzSI&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&start_radio=1&rv=VK4RcyZS_EE',
            stateVideo: 'true',
            dateCreate: '2025-02-07T04:20:37.741Z',
            average: 4,
            isDelete: 'false',
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
        idVideo: '67a58a15c092543d7cc19269',
        idUser: '67a58a15c092543d7cc19235',
        idRanking: '67a58a15c092543d7cc1926b',
        nameVideo:
          'Paloma Faith - Only Love Can Hurt Like This (Live at The BRIT Awards, 2015)',
        description:
          'Paloma Faith – Only Love Can Hurt Like This (Live from The BRIT Awards, 2015)',
        url: 'https://www.youtube.com/watch?v=_Dat9CRV800',
        stateVideo: 'true',
        dateCreate: '2025-02-07T04:20:37.816Z',
        average: 1,
        isDelete: 'false',
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
          idVideo: '67a95e13555ca8f41587ba9a',
          idUser: '67a642f1125b750bb327f491',
          idRanking: '67a95e13555ca8f41587ba9c',
          nameVideo: 'TRUSTcompany - Stronger',
          description:
            'Music video by TRUSTcompany performing Stronger. (C) 2005 Geffen Records',
          url: 'https://www.youtube.com/watch?v=zjcPG77_qHQ&list=RDzjcPG77_qHQ&start_radio=1',
          stateVideo: 'true',
          dateCreate: '2025-02-10T02:01:55.920Z',
          average: 0,
          isDelete: 'false',
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
          idVideo: '67a97b5cd46682bb947177ee',
          idUser: '67a642f1125b750bb327f491',
          idRanking: '',
          nameVideo: 'El punto débil de Ikki de Fénix ',
          description:
            'Saint Seiya - Los Caballeros del Zodiaco. Kassa de Lymnades (Léunades en Latinoamérica) descubre el punto débil de Ikki antes de morir en el capítulo 107 de la serie.',
          url: 'https://www.youtube.com/watch?v=Deg1wTorIiA',
          stateVideo: 'true',
          dateCreate: '2025-02-10T04:06:52.215Z',
          average: 0,
          isDelete: 'true',
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
