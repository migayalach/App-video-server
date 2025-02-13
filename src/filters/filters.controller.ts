import { Controller, Get, Query } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Response } from '../interfaces/response.interface';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get()
  @ApiOperation({ summary: 'Get filters' })
  @ApiQuery({
    name: 'search',
    required: true,
    description: 'Options to search',
    type: Number,
    example: 'video | audit | ranking',
  })
  @ApiQuery({
    name: 'data',
    required: true,
    description: 'Options to seach',
    type: Number,
    example: 'Order, Creation Date, Action, etc.',
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
    description: 'Resource not found',
    content: {
      'application/video': {
        examples: {
          requestIdUser: {
            summary:
              'Date start/end(optional), Key[nameVideo, stateVideo](request), order[ASC, DESC](optional).',
            value: {
              info: {
                count: 53,
                pages: 3,
                next: 'http://localhost:3001/app-video/filters?search=video&data=%7B%22dateStart%22%3A%222025-02-03%22%2C%22dateEnd%22%3A%22%22%2C%22key%22%3A%22nameVideo%22%2C%22order%22%3A%22DESC%22%7D&page=2',
                prev: null,
              },
              results: [
                {
                  idVideo: '67ac1b2cf89208c0aff20a06',
                  idUser: '67ac1b2cf89208c0aff209a6',
                  nameVideo:
                    'The Godfather – Orchestral Suite // The Danish National Symphony Orchestra (Live)',
                  description:
                    'In January 2018, The Danish Broadcast Corporation (DR) aired a concert called “The Morricone Duel” performed by The Danish National Symphony Orchestra /DR SymfoniOrkestret, The Danish National Concert Choir with various soloists conducted by Sarah Hicks.  The score is available on all regular Streaming-Platforms.',
                  url: 'https://www.youtube.com/watch?v=X-jdl9hcCeg',
                  stateVideo: 'true',
                  isDelete: 'false',
                  dateCreate: '2025-02-12T03:53:16.321Z',
                },
                {
                  idVideo: '67ac1b2cf89208c0aff20a10',
                  idUser: '67ac1b2cf89208c0aff209a4',
                  nameVideo: 'Siempre',
                  description: 'Provided to YouTube by Universal Music Group',
                  url: 'https://www.youtube.com/watch?v=NuIrbz0IRK8',
                  stateVideo: 'true',
                  isDelete: 'false',
                  dateCreate: '2025-02-12T03:53:16.336Z',
                },
                {
                  idVideo: '67ac1b2cf89208c0aff209fc',
                  idUser: '67ac1b2cf89208c0aff209a6',
                  nameVideo: 'Scarface | Push It to the Limit',
                  description:
                    'After Tony Montana kills drug lord Frank Lopez, he finally becomes one of the most powerful drug lords of Miami. Watch the "Push it to the Limit" scene from Scarface!',
                  url: 'https://www.youtube.com/watch?v=Olgn9sXNdl0',
                  stateVideo: 'true',
                  isDelete: 'false',
                  dateCreate: '2025-02-12T03:53:16.306Z',
                },
                {
                  idVideo: '67ac1b2cf89208c0aff209d4',
                  idUser: '67ac1b2cf89208c0aff209aa',
                  nameVideo: 'Queen - The Show Must Go On - Subtitulado',
                  description:
                    'Canción de la banda de Rock británica Queen dentro de su álbum Innuendo lanzado en 1991. Escrita por Brian May para Freddie Mercury quien se encontraba en sus últimos meses de vida. Lanzada como sencillo el 14 de octubre de 1991 en el Reino Unido, 6 semanas antes de la muerte de Freddie. Freddie Mercury nació en Stone Town, Zanzíbar, 5 de septiembre de 1946 – falleció en Kensington, Londres, Reino Unido, 24 de noviembre de 1991.',
                  url: 'https://www.youtube.com/watch?v=3wia7TSyebY',
                  stateVideo: 'true',
                  isDelete: 'false',
                  dateCreate: '2025-02-12T03:53:16.249Z',
                },
              ],
            },
          },
        },
      },
      'application/audit': {
        examples: {
          case1: {
            summary:
              'idUser(require), Date start(require), date end(optional), and order ASC or DESC',
            value: {
              info: {
                count: 6,
                pages: 2,
                next: 'http://localhost:3001/app-video/filters?search=audit&data=%7B%22idUser%22%3A%2267ac1b2cf89208c0aff209aa%22%2C%22dateStart%22%3A%222025-02-10%22%2C%22dateEnd%22%3A%22%22%2C%22action%22%3A%22%22%2C%22order%22%3A%22DESC%22%7D&page=2',
                prev: null,
              },
              results: [
                {
                  idAudit: '67ac1ff3e606e67025ed17b1',
                  idUser: '67ac1b2cf89208c0aff209aa',
                  idVideo: '67ac1b2cf89208c0aff209c0',
                  action: 'Delete',
                  timeChanges: '2025-02-12T04:13:39.441Z',
                  timeOnly: '12:13:39 AM',
                },
                {
                  idAudit: '67ac1ed60e6a4f63e974a785',
                  idUser: '67ac1b2cf89208c0aff209aa',
                  idVideo: '67ac1b2cf89208c0aff209b6',
                  action: 'Delete',
                  timeChanges: '2025-02-12T04:08:54.450Z',
                  timeOnly: '12:08:54 AM',
                },
                {
                  idAudit: '67ac1b2cf89208c0aff209d8',
                  idUser: '67ac1b2cf89208c0aff209aa',
                  idVideo: '67ac1b2cf89208c0aff209d4',
                  action: 'Create',
                  timeChanges: '2025-02-12T03:53:16.253Z',
                  timeOnly: '11:53:16 PM',
                },
                {
                  idAudit: '67ac1b2cf89208c0aff209ce',
                  idUser: '67ac1b2cf89208c0aff209aa',
                  idVideo: '67ac1b2cf89208c0aff209ca',
                  action: 'Create',
                  timeChanges: '2025-02-12T03:53:16.237Z',
                  timeOnly: '11:53:16 PM',
                },
              ],
            },
          },
          case2: {
            summary:
              "idUser(require), Date start/end(optional), Action('Create', 'Delete', 'Update'), and Order ASC or DESC",
            value: {
              info: {
                count: 2,
                pages: 1,
                next: null,
                prev: null,
              },
              results: [
                {
                  idAudit: '67ac1ff3e606e67025ed17b1',
                  idUser: '67ac1b2cf89208c0aff209aa',
                  idVideo: '67ac1b2cf89208c0aff209c0',
                  action: 'Delete',
                  timeChanges: '2025-02-12T04:13:39.441Z',
                  timeOnly: '12:13:39 AM',
                },
                {
                  idAudit: '67ac1ed60e6a4f63e974a785',
                  idUser: '67ac1b2cf89208c0aff209aa',
                  idVideo: '67ac1b2cf89208c0aff209b6',
                  action: 'Delete',
                  timeChanges: '2025-02-12T04:08:54.450Z',
                  timeOnly: '12:08:54 AM',
                },
              ],
            },
          },
        },
      },
      'application/ranking': {
        examples: {
          asc: {
            summary: 'Order ASC',
            value: {
              info: {
                count: 80,
                pages: 4,
                next: 'http://localhost:3001/app-video/filters?search=ranking&data=%7B%22order%22%3A%22ASC%22%7D&page=2',
                prev: null,
              },
              results: [
                {
                  idVideo: '67ac1b2cf89208c0aff209f2',
                  idUser: '67ac1b2cf89208c0aff209a8',
                  idRanking: '67ac1b2cf89208c0aff209f4',
                  nameVideo:
                    '6IX9INE "Gotti" (WSHH Exclusive - Official Music Video)',
                  description:
                    "WorldstarHipHop is home to everything entertainment & hip hop. The #1 urban outlet responsible for breaking the latest premiere music videos, exclusive artist content, entertainment stories, celebrity rumors, sports highlights, interviews, comedy skits, rap freestyles, crazy fights, eye candy models, the best viral videos & more. Since 2005, WorldstarHipHop has worked with some of our generation's most groundbreaking artists, athletes & musicians - all who have helped continue to define our unique identity and attitude. We plan on continuing to work with only the best, so keep an eye out for all the exciting new projects / collaborations we plan on dropping in the very near future.', url: 'https://www.youtube.com/watch?v=z5WrgDzNIZ0&list=RDMM&start_radio=1&rv=_Dat9CRV800",
                  url: 'https://www.youtube.com/watch?app=desktop&v=z5WrgDzNIZ0&t=1m48s',
                  stateVideo: 'true',
                  dateCreate: '2025-02-12T03:53:16.292Z',
                  average: 0,
                  isDelete: 'false',
                },
                {
                  idVideo: '67ac1b2cf89208c0aff20a06',
                  idUser: '67ac1b2cf89208c0aff209a6',
                  idRanking: '67ac1b2cf89208c0aff20a08',
                  nameVideo:
                    'The Godfather – Orchestral Suite // The Danish National Symphony Orchestra (Live)',
                  description:
                    'In January 2018, The Danish Broadcast Corporation (DR) aired a concert called “The Morricone Duel” performed by The Danish National Symphony Orchestra /DR SymfoniOrkestret, The Danish National Concert Choir with various soloists conducted by Sarah Hicks.  The score is available on all regular Streaming-Platforms.',
                  url: 'https://www.youtube.com/watch?v=X-jdl9hcCeg',
                  stateVideo: 'true',
                  dateCreate: '2025-02-12T03:53:16.321Z',
                  average: 0,
                  isDelete: 'false',
                },
                {
                  idVideo: '67ac1b2cf89208c0aff209ca',
                  idUser: '67ac1b2cf89208c0aff209aa',
                  idRanking: '67ac1b2cf89208c0aff209cc',
                  nameVideo: 'El Dorado - Una Senda Abriré | Letra',
                  description:
                    'Gracias por ver, no olviden suscribirse y ser inmensamente felices, sí hay algún error no olviden escribirlo en los comentarios, o quieren pedir alguna canción en específico no olviden enviarme mensaje, o ponerlo en los comentarios, con cariño y amor, Brenda.',
                  url: 'https://www.youtube.com/watch?v=NKUIAOD8P_A&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&index=2',
                  stateVideo: 'true',
                  dateCreate: '2025-02-12T03:53:16.232Z',
                  average: 1,
                  isDelete: 'false',
                },
                {
                  idVideo: '67ac1b2cf89208c0aff209fc',
                  idUser: '67ac1b2cf89208c0aff209a6',
                  idRanking: '67ac1b2cf89208c0aff209fe',
                  nameVideo: 'Scarface | Push It to the Limit',
                  description:
                    'After Tony Montana kills drug lord Frank Lopez, he finally becomes one of the most powerful drug lords of Miami. Watch the "Push it to the Limit" scene from Scarface!',
                  url: 'https://www.youtube.com/watch?v=Olgn9sXNdl0',
                  stateVideo: 'true',
                  dateCreate: '2025-02-12T03:53:16.306Z',
                  average: 2,
                  isDelete: 'false',
                },
              ],
            },
          },
          desc: {
            summary: 'Order DESC',
            value: {
              info: {
                count: 52,
                pages: 3,
                next: 'http://localhost:3001/app-video/filters?search=ranking&data=%7B%22order%22%3A%22DESC%22%7D&page=2',
                prev: null,
              },
              results: [
                {
                  idVideo: '67ac1b2cf89208c0aff209d4',
                  idUser: '67ac1b2cf89208c0aff209aa',
                  idRanking: '67ac1b2cf89208c0aff209d6',
                  nameVideo: 'Queen - The Show Must Go On - Subtitulado',
                  description:
                    'Canción de la banda de Rock británica Queen dentro de su álbum Innuendo lanzado en 1991. Escrita por Brian May para Freddie Mercury quien se encontraba en sus últimos meses de vida. Lanzada como sencillo el 14 de octubre de 1991 en el Reino Unido, 6 semanas antes de la muerte de Freddie. Freddie Mercury nació en Stone Town, Zanzíbar, 5 de septiembre de 1946 – falleció en Kensington, Londres, Reino Unido, 24 de noviembre de 1991.',
                  url: 'https://www.youtube.com/watch?v=3wia7TSyebY',
                  stateVideo: 'true',
                  dateCreate: '2025-02-12T03:53:16.249Z',
                  average: 4,
                  isDelete: 'false',
                },
                {
                  idVideo: '67ac1b2cf89208c0aff20a10',
                  idUser: '67ac1b2cf89208c0aff209a4',
                  idRanking: '67ac1b2cf89208c0aff20a12',
                  nameVideo: 'Siempre',
                  description: 'Provided to YouTube by Universal Music Group',
                  url: 'https://www.youtube.com/watch?v=NuIrbz0IRK8',
                  stateVideo: 'true',
                  dateCreate: '2025-02-12T03:53:16.336Z',
                  average: 4,
                  isDelete: 'false',
                },
                {
                  idVideo: '67ac1b2cf89208c0aff209de',
                  idUser: '67ac1b2cf89208c0aff209a8',
                  idRanking: '67ac1b2cf89208c0aff209e0',
                  nameVideo:
                    'Juan Gabriel - Así Fue (En Vivo Desde Bellas Artes, México/ 2013)',
                  description:
                    'Escucha “Así Fue” del álbum EN VIVO DESDE BELLAS ARTES en tu plataforma favorita: ',
                  url: 'https://www.youtube.com/watch?v=I8gLa380bko',
                  stateVideo: 'true',
                  dateCreate: '2025-02-12T03:53:16.264Z',
                  average: 3,
                  isDelete: 'false',
                },
                {
                  idVideo: '67ac1b2cf89208c0aff209e8',
                  idUser: '67ac1b2cf89208c0aff209a8',
                  idRanking: '67ac1b2cf89208c0aff209ea',
                  nameVideo:
                    'Paloma Faith - Only Love Can Hurt Like This (Live at The BRIT Awards, 2015)',
                  description:
                    'Paloma Faith – Only Love Can Hurt Like This (Live from The BRIT Awards, 2015)',
                  url: 'https://www.youtube.com/watch?v=_Dat9CRV800',
                  stateVideo: 'true',
                  dateCreate: '2025-02-12T03:53:16.279Z',
                  average: 3,
                  isDelete: 'false',
                },
              ],
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Please introduce your identification.',
    schema: {
      example: {
        status: 400,
        message: 'Please introduce your identification.',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while search information.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while search information.',
      },
    },
  })
  async findAll(
    @Query('search') search: string,
    @Query('data') data: string,
    @Query('page') page: string,
  ): Promise<Response> {
    return await this.filtersService.findAll(search, data, +page);
  }
}
