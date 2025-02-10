import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RankingService } from 'src/ranking/ranking.service';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './schemas/video.schema';
import { Model, Types } from 'mongoose';
import { clearResVideos, clearVideoRes } from 'src/utils/clearResponse.util';
import { response } from 'src/utils/response.util';
import {
  OneVideoResponse,
  VideoResponse,
} from 'src/interfaces/video.interface';
import { Response } from 'src/interfaces/response.interface';
import { AuditService } from 'src/audit/audit.service';
import { AuditState } from 'src/enums/audit.enum';
import { VideoDelete } from 'src/enums/video.enum';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    private useSevice: UserService,
    private rankingService: RankingService,
    private auditService: AuditService,
  ) {}
  async create(infoVideo: CreateVideoDto): Promise<VideoResponse> {
    try {
      await this.useSevice.findOne(infoVideo.idUser.toString());
      if (
        await this.videoModel.findOne({
          $or: [{ nameVideo: infoVideo.nameVideo }, { url: infoVideo.url }],
        })
      ) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Sorry this name or url currently exists.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const createVideo = new this.videoModel({
        ...infoVideo,
        idUser: new Types.ObjectId(infoVideo.idUser),
      });
      const videoData = await createVideo.save();
      await this.rankingService.create({
        idUser: new Types.ObjectId(videoData.idUser.toString()),
        idVideo: new Types.ObjectId(videoData._id.toString()),
      });
      await this.auditService.create({
        idUser: new Types.ObjectId(infoVideo.idUser),
        idVideo: new Types.ObjectId(videoData._id.toString()),
        action: AuditState.Create,
      });

      return {
        message: 'Video created successfully',
        video: await this.findOne(videoData._id.toString()),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while creating the video.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page): Promise<Response> {
    if (!page) {
      page = 1;
    }
    try {
      const results = clearResVideos(
        await this.videoModel.find({ stateVideo: true }).select('-__v'),
      );

      for (let i = 0; i < results.length; i++) {
        const { _id, average } = await this.rankingService.findOne(
          results[i].idVideo,
        );
        results[i] = { ...results[i], idRanking: _id.toString(), average };
      }

      return response(results, page, 'video?');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while retrieving videos',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(idVideo: string): Promise<OneVideoResponse> {
    try {
      const videoInfo = await this.videoModel.findById(idVideo).select('-__v');
      if (!videoInfo) {
        throw new HttpException(
          { status: HttpStatus.NOT_FOUND, message: 'Video not found.' },
          HttpStatus.NOT_FOUND,
        );
      }

      const clearInfo = clearVideoRes(videoInfo);
      const { _id, average } = await this.rankingService.findOne(idVideo);
      return { ...clearInfo, idRanking: _id.toString(), average };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while retrieving the video.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    idVideo: string,
    infoVideo: UpdateVideoDto,
  ): Promise<VideoResponse> {
    try {
      const videoData = await this.videoModel
        .findById(idVideo)
        .select('isDelete')
        .lean();

      if (videoData.isDelete === VideoDelete.true) {
        throw new HttpException(
          { status: HttpStatus.FORBIDDEN, message: 'Access denied.' },
          HttpStatus.FORBIDDEN,
        );
      }

      const changes: Record<string, any> = {};
      const afterInfo = await this.findOne(idVideo);
      for (const i in afterInfo) {
        if (infoVideo.hasOwnProperty(i) && infoVideo[i] !== afterInfo[i]) {
          changes[i] = {
            before: afterInfo[i],
            after: infoVideo[i],
          };
        }
      }

      if (!Object.keys(changes).length) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'No changes detected, update not applied',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.auditService.create({
        idUser: new Types.ObjectId(infoVideo.idUser),
        idVideo: new Types.ObjectId(idVideo),
        action: AuditState.Update,
        changes,
      });

      await this.videoModel.findByIdAndUpdate(idVideo, {
        ...infoVideo,
        idUser: new Types.ObjectId(infoVideo.idUser),
      });

      return {
        message: 'Video updated successfully',
        video: await this.findOne(idVideo),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while updating the video',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(idVideo: string): Promise<VideoResponse> {
    try {
      const { isDelete } = await this.findOne(idVideo);
      if (isDelete === VideoDelete.true) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'This video has already been deleted',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const infoVideo = await this.videoModel.findByIdAndUpdate(idVideo, {
        isDelete: true,
      });

      await this.useSevice.findOne(infoVideo.idUser.toString());

      await this.auditService.create({
        idUser: new Types.ObjectId(infoVideo.idUser),
        idVideo: new Types.ObjectId(idVideo.toString()),
        action: AuditState.Delete,
      });

      return {
        message: 'Video deleted successfully',
        video: clearVideoRes(await this.videoModel.findByIdAndDelete(idVideo)),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while deleting the video',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
