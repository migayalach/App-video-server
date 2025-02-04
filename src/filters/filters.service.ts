import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Audit } from 'src/audit/schemas/audit.schema';
import { VideoDelete } from 'src/enums/video.enum';
import { VideoQuery } from 'src/interfaces/filters.interface';
import { Ranking } from 'src/ranking/schema/ranking.schema';
import { Video } from 'src/video/schemas/video.schema';
import { response } from '../utils/response.util';

@Injectable()
export class FiltersService {
  constructor(
    @InjectModel(Audit.name) private auditModel: Model<Audit>,
    @InjectModel(Video.name) private videoModel: Model<Video>,
    @InjectModel(Ranking.name) private rankingModel: Model<Ranking>,
  ) {}

  private async dataSearch(search: string, data: any) {
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

        return await this.auditModel
          .find(queryAudit)
          .sort({ timeChanges: data.order === 'ASC' ? 1 : -1 })
          .select('-__v -changes');

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

        return await this.videoModel
          .find(query)
          .sort({ [data.key]: data.order === 'ASC' ? 1 : -1 })
          .select('-__v');

      case 'ranking':
        return await this.rankingModel
          .find()
          .sort({ average: data.order === 'ASC' ? 1 : -1 })
          .select('-__v -listVotes');

      default:
        return [];
    }
  }

  async findAll(search: string, data: any, page?: number) {
    try {
      if (!page) {
        page = 1;
      }
      const results = await this.dataSearch(search, JSON.parse(data));
      return results;
      // return response(results, page, '');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while creating the audit.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
