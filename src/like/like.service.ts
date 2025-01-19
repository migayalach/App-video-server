import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from './schemas/like.schema';
import { UserService } from 'src/user/user.service';
import { VideoService } from 'src/video/video.service';
import { clearListVideoLike } from 'src/interfaces/like.interface';
import { response } from 'src/utils/response.util';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>,
    private userService: UserService,
    private videoService: VideoService,
  ) {}

  async create(infoLike: CreateLikeDto): Promise<any> {
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
            error: `Sorry this video is curretnly in your favorites.`,
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
        message: 'Video added to favorites list.',
        video: await this.videoService.findOne(infoLike.idVideo.toString()),
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

  async findOne(idUser: string, page?: number): Promise<any> {
    try {
      if (!page) {
        page = 1;
      }
      await this.userService.findOne(idUser.toString());
      const listVideo = await this.likeModel
        .find({ idUser: new Types.ObjectId(idUser) })
        .select('-idUser -__v')
        .populate({
          path: 'idVideo',
          model: 'Video',
          select: '_id idUser nameVideo description url stateVideo dateCreate',
        });
      return response(clearListVideoLike(listVideo), page, `like/${idUser}?`);
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

  async remove(idLike: string): Promise<any> {
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
            error: `Sorry this video don't exist.`,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const { idVideo } = await this.likeModel.findByIdAndDelete(idLike);
      return {
        message: `Video deleted successfully`,
        video: await this.videoService.findOne(idVideo.toString()),
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
