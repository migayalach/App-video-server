import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { VideoResponse } from 'src/interfaces/video.interface';
import { Response } from 'src/interfaces/response.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  //!CREATE LIKE
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create new like video' })
  @ApiResponse({
    status: 201,
    description: 'Like successfully created',
    schema: {
      example: {
        message: 'Video added to favorites list.',
        video: {
          idVideo: '678d123a954eefc016e2ccea',
          idUser: '6787c185d67c1c00e1758fa8',
          nameVideo:
            'Rafael arruina los planes de Rubén | Hasta que la plata nos separe 2006',
          description:
            'La oferta presentada por Rafael convence a Jorge y él acepta venderle su hacienda. Rubén y Rodrigo no entienden qué pasa, pues de la nada, quedó por el suelo su sueño de quedarse con una propiedad tan valiosa.',
          url: 'https://www.youtube.com/watch?v=_Q5H8mt47IM',
          stateVideo: 'true',
          dateCreate: '2025-01-19T14:54:50.737Z',
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
          requestIdVideo: {
            summary: 'The "idVideo" field is required',
            value: {
              statusCode: 400,
              message: 'The "idVideo" field is required',
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
            summary: 'User not found',
            value: { status: 404, message: "Sorry, this user doesn't exist" },
          },
          videoNotFound: {
            summary: 'Video not found.',
            value: {
              status: 404,
              message: 'Video not found.',
            },
          },
          videoRepeat: {
            summary: 'Video repeat exists',
            value: {
              status: 404,
              message: `This video is already in your favorites.`,
            },
          },
          videoConflict: {
            summary: "Video doens't exists",
            value: {
              status: 404,
              message: "Sorry, this video doesn't exists.",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description:
      'An unexpected error occurred while adding the video to favorites.',
    schema: {
      example: {
        status: 500,
        message:
          'An unexpected error occurred while adding the video to favorites.',
      },
    },
  })
  async create(@Body() infoLike: CreateLikeDto): Promise<VideoResponse> {
    return await this.likeService.create(infoLike);
  }

  //!GET LIST OF VIDEOS USERS LIKE
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':idUser')
  @ApiOperation({ summary: 'Get the list like of users videos' })
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
    description: 'User like videos pagination and response',
    schema: {
      example: {
        info: {
          count: 4,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [
          {
            idLike: '678bcced664028dc5714ad32',
            video: {
              idUser: '678726a888a21c3097b5c5d1',
              nameVideo:
                'JACOB FATU TRACIONARÁ a SOLO para ser JEFE TRIBAL? 😨 - ALTOS y BAJOS SMACKDOWN',
              description:
                'Conviértete en MIEMBRO y se parte de los SEXY BOYS del Canal 🥰',
              url: 'https://www.youtube.com/watch?v=b3V4cddqzUI',
              stateVideo: 'true',
              dateCreate: '2025-01-18T14:20:23.258Z',
            },
          },
          {
            idLike: '678d8f8ac2c67b9fca4d5e58',
            video: {
              idUser: '678726a888a21c3097b5c5d1',
              nameVideo: 'My video',
              description: 'Holis mundo',
              url: 'https://www.youtube.com/watch?v=L2UA8aUmw4k',
              stateVideo: 'true',
              dateCreate: '2025-01-17T14:48:26.821Z',
            },
          },
          {
            idLike: '678d8fa4c2c67b9fca4d5e64',
            video: {
              idUser: '6787c185d67c1c00e1758fa8',
              nameVideo:
                'Canción del episodio 5 del Juego del Calamar 2 | Shin Hae Chul - To You (그대에게) | Letra en Español',
              description:
                "Pentatlon juego del calamar 2, episodio 5, juego 2, segundo juego del juego del calamar 2, español, letra, lyrics, sub español, Canción del episodio 6 del Juego del Calamar 2 🦑 | 둥글게 둥글게 | Letra en Español letra en español, Squid Game 2 Episode 6 Mingle Game Song Extended, Mingle Game Song With Lyrics | Round and Round | Full Version Soundtrack | Squid Game | Season 2, Korean Children's Songs – 둥글게 둥글게",
              url: 'https://www.youtube.com/watch?v=018i4yOFf-s',
              stateVideo: 'true',
              dateCreate: '2025-01-19T02:43:03.565Z',
            },
          },
          {
            idLike: '67911e50f9e6f949262708d5',
            video: {
              idUser: '6787c185d67c1c00e1758fa8',
              nameVideo:
                'Rafael arruina los planes de Rubén | Hasta que la plata nos separe 2006',
              description:
                'La oferta presentada por Rafael convence a Jorge y él acepta venderle su hacienda. Rubén y Rodrigo no entienden qué pasa, pues de la nada, quedó por el suelo su sueño de quedarse con una propiedad tan valiosa.',
              url: 'https://www.youtube.com/watch?v=_Q5H8mt47IM',
              stateVideo: 'true',
              dateCreate: '2025-01-19T14:54:50.737Z',
            },
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
        message: "Sorry, this user doesn't exist",
      },
    },
  })
  @ApiResponse({
    status: 500,
    description:
      'An unexpected error occurred while retrieving the liked videos.',
    schema: {
      example: {
        status: 500,
        message:
          'An unexpected error occurred while retrieving the liked videos.',
      },
    },
  })
  async findOne(
    @Param('idUser') idUser: string,
    @Query('page') page: string,
  ): Promise<Response> {
    return await this.likeService.findOne(idUser, +page);
  }

  //!DELETE LIKE
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':idLike')
  @ApiOperation({ summary: 'Delete like video of list the user' })
  @ApiParam({
    name: 'idLike',
    description:
      "'idLike' parameter to search the database and get data and delete video.",
    type: String,
    example: '67911e50f9e6f949262708d5',
  })
  @ApiResponse({
    status: 200,
    description: 'Video successfully delete',
    schema: {
      example: {
        message: 'Video deleted successfully',
        video: {
          idVideo: '678d123a954eefc016e2ccea',
          idUser: '6787c185d67c1c00e1758fa8',
          nameVideo:
            'Rafael arruina los planes de Rubén | Hasta que la plata nos separe 2006',
          description:
            'La oferta presentada por Rafael convence a Jorge y él acepta venderle su hacienda. Rubén y Rodrigo no entienden qué pasa, pues de la nada, quedó por el suelo su sueño de quedarse con una propiedad tan valiosa.',
          url: 'https://www.youtube.com/watch?v=_Q5H8mt47IM',
          stateVideo: 'true',
          dateCreate: '2025-01-19T14:54:50.737Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this video doesn't exists.",
    schema: {
      example: {
        status: 404,
        message: "Sorry, this video doesn't exists.",
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while removing the video.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while removing the video.',
      },
    },
  })
  async remove(@Param('idLike') idLike: string): Promise<VideoResponse> {
    return await this.likeService.remove(idLike);
  }
}
