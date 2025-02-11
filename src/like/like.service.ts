import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from './schemas/like.schema';
import { UserService } from 'src/user/user.service';
import { VideoService } from 'src/video/video.service';
import { response } from 'src/utils/response.util';
import { VideoResponse } from 'src/interfaces/video.interface';
import { Response } from 'src/interfaces/response.interface';
import { clearListVideoLike } from 'src/utils/clearResponse.util';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>,
    private userService: UserService,
    private videoService: VideoService,
  ) {}

  async create(infoLike: CreateLikeDto): Promise<VideoResponse> {
    try {
      await this.userService.findOne(infoLike.idUser.toString());
      await this.videoService.findOne(infoLike.idVideo.toString());
      const data = await this.likeModel.findOne({
        idUser: new Types.ObjectId(infoLike.idUser),
        idVideo: new Types.ObjectId(infoLike.idVideo),
      });
      if (data) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `This video is already in your favorites.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const addList = new this.likeModel({
        idUser: new Types.ObjectId(infoLike.idUser),
        idVideo: new Types.ObjectId(infoLike.idVideo),
      });
      await addList.save();
      return {
        message: 'Video successfully added to favorites.',
        video: await this.videoService.findOne(infoLike.idVideo.toString()),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'An unexpected error occurred while adding the video to favorites.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(idUser: string, page?: number): Promise<Response> {
    try {
      if (!page) {
        page = 1;
      }
      await this.userService.findOne(idUser.toString());
      const listVideo = await this.likeModel
        .find({
          idUser: new Types.ObjectId(idUser),
        })
        .select('-idUser -__v');

      const data = [];
      for (let i = 0; i < listVideo.length; i++) {
        const obj = { _id: '', idVideo: {} };
        obj._id = listVideo[i]._id.toString();
        obj.idVideo = await this.videoService.findOne(
          listVideo[i].idVideo.toString(),
        );
        data.push(obj);
      }
      return response(clearListVideoLike(data), page, `like/${idUser}?`);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'An unexpected error occurred while retrieving the liked videos.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(idLike: string): Promise<VideoResponse> {
    try {
      const data = await this.likeModel
        .findById({
          _id: new Types.ObjectId(idLike),
        })
        .select('-__v');
      if (!data) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Sorry, this video does not exist in your favorites.`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const { idVideo } = await this.likeModel.findByIdAndDelete(idLike);
      return {
        message: `Video successfully removed from favorites.`,
        video: await this.videoService.findOne(idVideo.toString()),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An unexpected error occurred while removing the video.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
