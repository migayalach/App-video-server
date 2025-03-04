import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MyVideosService } from './my-videos.service';
import { Response } from 'src/interfaces/response.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('my-videos')
export class MyVideosController {
  constructor(private readonly myVideosService: MyVideosService) {}

  // !@GET ALL MY VIDEOS
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':idUser')
  @ApiOperation({ summary: 'Get list my videos' })
  @ApiParam({
    name: 'idUser',
    description: "'idUser' parameter to search the database and get all data.",
    type: String,
    example: '678726a888a21c3097b5c5d1',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 201,
    description: "The list with all the user's videos.",
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
            idVideo: '67c22a9c254eab1f5d8cb863',
            idUser: '67c22a9b254eab1f5d8cb854',
            idRanking: '',
            nameVideo: 'Comodo (Remix) - Oma 206 Ft. Jowell y Randy',
            description:
              'Directed By Cesar Berrios y Alvaro Diaz Bacon & Soda Films 2013 www.molinarecords.com Twitter/Instagram- @molinarecords Facebook- Molina Records',
            image:
              'https://res.cloudinary.com/dqgcyonb9/image/upload/v1729003087/Ballet/qmqxykpcvdtqtr3rob8b.png',
            url: 'https://www.youtube.com/watch?v=VK4RcyZS_EE',
            stateVideo: 'true',
            dateCreate: '2025-02-28T21:29:00.984Z',
            average: 0,
            usersLike: ['67c22a9b254eab1f5d8cb856'],
            isDelete: 'false',
          },
          {
            idVideo: '67c22a9e254eab1f5d8cb86e',
            idUser: '67c22a9b254eab1f5d8cb854',
            idRanking: '',
            nameVideo: 'C-Kan - Vuelve ft. MC Davo (Video Oficial)',
            description:
              'Music video by C-Kan performing Vuelve. 2013 Mastered Trax / C-Mobztas',
            image:
              'https://res.cloudinary.com/dqgcyonb9/image/upload/v1728952784/Ballet/mw6fakoaniv1zwragaqd.jpg',
            url: 'https://www.youtube.com/watch?v=7bPAJgVRzSI&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&start_radio=1&rv=VK4RcyZS_EE',
            stateVideo: 'true',
            dateCreate: '2025-02-28T21:29:02.346Z',
            average: 0,
            usersLike: ['67c22a9b254eab1f5d8cb850'],
            isDelete: 'false',
          },
          {
            idVideo: '67c22a9e254eab1f5d8cb878',
            idUser: '67c22a9b254eab1f5d8cb854',
            idRanking: '',
            nameVideo: 'El Dorado - Una Senda Abriré | Letra',
            description:
              'Gracias por ver, no olviden suscribirse y ser inmensamente felices, sí hay algún error no olviden escribirlo en los comentarios, o quieren pedir alguna canción en específico no olviden enviarme mensaje, o ponerlo en los comentarios, con cariño y amor, Brenda.',
            image:
              'https://res.cloudinary.com/dqgcyonb9/image/upload/v1729008540/Ballet/aurtn65exu4pq5v0yy8k.png',
            url: 'https://www.youtube.com/watch?v=NKUIAOD8P_A&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&index=2',
            stateVideo: 'true',
            dateCreate: '2025-02-28T21:29:02.875Z',
            average: 0,
            usersLike: [],
            isDelete: 'false',
          },
          {
            idVideo: '67c22a9e254eab1f5d8cb882',
            idUser: '67c22a9b254eab1f5d8cb854',
            idRanking: '',
            nameVideo: 'Queen - The Show Must Go On - Subtitulado',
            description:
              'Canción de la banda de Rock británica Queen dentro de su álbum Innuendo lanzado en 1991. Escrita por Brian May para Freddie Mercury quien se encontraba en sus últimos meses de vida. Lanzada como sencillo el 14 de octubre de 1991 en el Reino Unido, 6 semanas antes de la muerte de Freddie. Freddie Mercury nació en Stone Town, Zanzíbar, 5 de septiembre de 1946 – falleció en Kensington, Londres, Reino Unido, 24 de noviembre de 1991.',
            image:
              'https://res.cloudinary.com/dqgcyonb9/image/upload/v1729008634/Ballet/sb2tfktvhvajfulwu62b.png',
            url: 'https://www.youtube.com/watch?v=3wia7TSyebY',
            stateVideo: 'true',
            dateCreate: '2025-02-28T21:29:02.912Z',
            average: 0,
            usersLike: ['67c22a9b254eab1f5d8cb850'],
            isDelete: 'false',
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
    description: 'An unexpected error occurred while processing the request.',
    schema: {
      example: {
        status: 500,
        message:
          'An unexpected error occurred while searching for your favorite videos.',
      },
    },
  })
  async findOne(
    @Param('idUser') idUser: string,
    @Query('page') page: string,
  ): Promise<Response> {
    return await this.myVideosService.findOne(idUser, +page);
  }
}
