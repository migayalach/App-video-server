import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Audit } from 'src/audit/schemas/audit.schema';
import { VideoDelete } from 'src/enums/video.enum';
import { VideoQuery } from 'src/interfaces/filters.interface';
import { Ranking } from 'src/ranking/schema/ranking.schema';
import { clearVideoRes } from 'src/utils/clearResponse.util';
import { Video } from 'src/video/schemas/video.schema';
import { response } from '../utils/response.util';

@Injectable()
export class FiltersService {
  constructor(
    @InjectModel(Audit.name) private auditModel: Model<Audit>,
    @InjectModel(Video.name) private videoModel: Model<Video>,
    @InjectModel(Ranking.name) private rankingModel: Model<Ranking>,
  ) {}

  private async dataSearch(search: string, data: any): Promise<any> {
    switch (search) {
      case 'audit':
        const queryAudit: any = {
          idUser: new Types.ObjectId(data.idUser),
        };

        if (data.action) {
          queryAudit.action = data.action;
        }

        if (data.dateStart || data.dateEnd) {
          queryAudit.timeChanges = {
            ...(data.dateStart && { $gte: new Date(data.dateStart) }),
            ...(data.dateEnd && { $lte: new Date(data.dateEnd) }),
          };
        }
        const dataAudit = await this.auditModel
          .find(queryAudit)
          .sort({ timeChanges: data.order === 'ASC' ? 1 : -1 })
          .select('-__v -changes');

        return dataAudit.map(
          ({ _id, idUser, idVideo, action, timeChanges, timeOnly }) => {
            return {
              idAudit: _id,
              idUser,
              idVideo,
              action,
              timeChanges,
              timeOnly,
            };
          },
        );

      case 'video':
        const query: VideoQuery = {
          isDelete: { $ne: VideoDelete.true },
        };

        if (data.dateStart || data.dateEnd) {
          query.dateCreate = {
            ...(data.dateStart && { $gte: new Date(data.dateStart) }),
            ...(data.dateEnd && { $lte: new Date(data.dateEnd) }),
          };
        }

        const dataVideo = await this.videoModel
          .find(query)
          .sort({ [data.key]: data.order === 'ASC' ? 1 : -1 })
          .select('-__v');
        return dataVideo.map(
          ({
            _id,
            idUser,
            nameVideo,
            description,
            url,
            stateVideo,
            isDelete,
            dateCreate,
          }) => {
            return {
              idVideo: _id,
              idUser,
              nameVideo,
              description,
              url,
              stateVideo,
              isDelete,
              dateCreate,
            };
          },
        );

      case 'ranking':
        const dataRankign = await this.rankingModel
          .find()
          .sort({ average: data.order === 'ASC' ? 1 : -1 })
          .select('-__v -listVotes');
        const listRanking = await Promise.all(
          dataRankign.map(async ({ _id, idVideo, average }) => {
            const dataVideo = await this.videoModel
              .findOne({ _id: idVideo, isDelete: false })
              .select('-__v');
            const info = clearVideoRes(dataVideo);
            return { ...info, idRanking: _id, average };
          }),
        );

        return listRanking;

      default:
        return [];
    }
  }

  async findAll(search: string, data: any, page?: number): Promise<any> {
    try {
      if (!page) {
        page = 1;
      }
      const results = await this.dataSearch(search, JSON.parse(data));
      return response(results, page, '');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          messge: 'An unexpected error occurred while search information.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
