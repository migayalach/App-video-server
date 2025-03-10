import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { VideoService } from 'src/video/video.service';
import { response } from 'src/utils/response.util';
import { VideoResponse } from 'src/interfaces/video.interface';
import { Response } from 'src/interfaces/response.interface';

@Injectable()
export class LikeService {
  constructor(
    private userService: UserService,
    private videoService: VideoService,
  ) {}

  async create(infoLike: CreateLikeDto): Promise<VideoResponse> {
    try {
      await this.userService.findOne(infoLike.idUser.toString());
      await this.videoService.findOne(infoLike.idVideo.toString());
      const data = await this.videoService.findOne(infoLike.idVideo.toString());
      if (data.usersLike.includes(infoLike.idUser.toString())) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `This video is already in your favorites.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.videoService.actionLike(
        'like',
        infoLike.idVideo.toString(),
        infoLike.idUser.toString(),
      );

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
      const results = await this.videoService.allVideos(false);
      const favorites = results.filter(({ usersLike }) =>
        usersLike.includes(idUser),
      );
      return response(favorites, page, `like/${idUser}?`);
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

  async remove(idVideo: string, idUser: string): Promise<VideoResponse> {
    try {
      const data = await this.videoService.findOne(idVideo);
      if (!data.usersLike.includes(idUser)) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `This video isn't already in your favorites.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const infoVideo = await this.videoService.findOne(idVideo);
      await this.videoService.actionLike('dislike', idVideo, idUser);
      return {
        message: `Video successfully removed from favorites.`,
        video: infoVideo,
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
