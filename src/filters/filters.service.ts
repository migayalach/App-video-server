import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Audit } from 'src/audit/schemas/audit.schema';
import { VideoDelete } from 'src/enums/video.enum';
import { Ranking } from 'src/ranking/schema/ranking.schema';
import { User } from 'src/user/schemas/user.schema';
import { dateSearch } from 'src/utils/operations.util';
import { Video } from 'src/video/schemas/video.schema';

@Injectable()
export class FiltersService {
  constructor(
    @InjectModel(Audit.name) private auditModel: Model<Audit>,
    @InjectModel(Video.name) private videoModel: Model<Video>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Ranking.name) private rankingModel: Model<Ranking>,
  ) {}

  private async dataSearch(search: string, data: any) {
    switch (search) {
      case 'audit':
        return [search];

      case 'video':
        dateSearch(data.dateStart, data.dateEnd);
        // const response = await this.videoModel
        //   .find({
        //     isDelete: { $ne: VideoDelete.true },
        //     $or: [{ dateCreate: { $gte: data.dateStart } }],
        //   })
        //   .sort({ nameVideo: data.order === 'ASC' ? 1 : -1 })
        //   .select('-__v');
        return "response";

      case 'followers':
        return [search];

      case 'creators':
        return [search];

      case 'ranking':
        return [search];

      default:
        break;
    }
  }

  async findAll(search: string, data: any, page?: number) {
    try {
      if (!page) {
        page = 1;
      }
      const responseSearch = await this.dataSearch(search, JSON.parse(data));
      return responseSearch;
      // return response(responseSearch, page, '');
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
