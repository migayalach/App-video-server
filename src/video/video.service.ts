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
  VideoResponse,
  VideoResponseClear,
} from 'src/interfaces/video.interface';
import { Response } from 'src/interfaces/response.interface';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    private useSevice: UserService,
    private rankingService: RankingService,
  ) {}
  async create(infoVideo: CreateVideoDto): Promise<VideoResponse> {
    try {
      await this.useSevice.findOne(infoVideo.idUser.toString());
      if (await this.videoModel.findOne({ nameVideo: infoVideo.nameVideo })) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Sorry this name currently exists`,
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
        idVideo: new Types.ObjectId(videoData._id.toString()),
      });

      return {
        message: 'Video created successfully',
        video: clearVideoRes(videoData),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while creating the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page?: number): Promise<Response> {
    try {
      const results = clearResVideos(
        await this.videoModel.find({ stateVideo: true }).select('-__v'),
      );
      if (!page) {
        page = 1;
      }

      return response(results, page, 'video?');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while creating the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(idVideo: string): Promise<VideoResponseClear> {
    try {
      const videoInfo = await this.videoModel.findById(idVideo).select('-__v');
      if (!videoInfo) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: "Sorry this video doesn't exist",
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return clearVideoRes(videoInfo);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while creating the user.',
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
      await this.findOne(idVideo);
      const updateVideo = {
        ...infoVideo,
        idUser: new Types.ObjectId(infoVideo.idUser),
      };
      const videoInfo = await this.videoModel.findByIdAndUpdate(
        idVideo,
        updateVideo,
        {
          new: true,
        },
      );
      return {
        message: `Video updated successfully`,
        video: clearVideoRes(videoInfo),
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

  async remove(idVideo: string): Promise<VideoResponse> {
    try {
      await this.findOne(idVideo);
      return {
        message: `Video deleted successfully`,
        video: clearVideoRes(await this.videoModel.findByIdAndDelete(idVideo)),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while creating the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
