import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'src/interfaces/response.interface';
import { UserService } from 'src/user/user.service';
import { response } from 'src/utils/response.util';
import { VideoService } from 'src/video/video.service';

@Injectable()
export class MyVideosService {
  constructor(
    private userService: UserService,
    private videoService: VideoService,
  ) {}

  async findOne(idUser: string, page?: number): Promise<Response> {
    try {
      if (!page) {
        page = 1;
      }
      await this.userService.findOne(idUser);
      const data = await this.videoService.allVideos(true);
      const favoriteList = data?.filter((index) => index.idUser === idUser);
      return response(favoriteList, page, `my-videos/${idUser}?`);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error:
            'An unexpected error occurred while searching for your favorite videos.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
