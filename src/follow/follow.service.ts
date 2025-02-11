import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { response } from 'src/utils/response.util';
import { Follow } from 'src/enums/follow.enum';
import { Response } from 'src/interfaces/response.interface';
import { ChannelUser, FollowResponse } from 'src/interfaces/follow.interface';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private userService: UserService,
  ) {}

  async create(dataFollow: CreateFollowDto): Promise<FollowResponse> {
    try {
      await this.userService.findOne(dataFollow.idUser.toString());
      await this.userService.findOne(dataFollow.idCreador.toString());
      if (dataFollow.option === Follow.Delete) {
        await this.UserModel.findByIdAndUpdate(dataFollow.idUser, {
          $pull: { follow: new Types.ObjectId(dataFollow.idCreador) },
        });
      } else if (dataFollow.option === Follow.Adding) {
        const { follow } = await this.UserModel.findById(
          dataFollow.idUser.toString(),
        ).select('-password');
        const idFollow = new Types.ObjectId(dataFollow.idCreador);
        if (follow.includes(idFollow)) {
          throw new HttpException(
            {
              status: HttpStatus.CONFLICT,
              message: 'You are already following this creator.',
            },
            HttpStatus.CONFLICT,
          );
        }
        await this.UserModel.findByIdAndUpdate(dataFollow.idUser, {
          $push: { follow: new Types.ObjectId(dataFollow.idCreador) },
        });
      }
      const { idUser, name, email, picture } = await this.userService.findOne(
        dataFollow.idCreador.toString(),
      );

      return {
        message:
          dataFollow.option === Follow.Adding
            ? 'Follow this channel'
            : 'Unfollow this channel',
        creator: { idUser, name, email, picture },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An unexpected error occurred while processing the request.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(idUser: string, page?: number): Promise<Response> {
    try {
      if (!page) {
        page = 1;
      }
      const { follow } =
        await this.UserModel.findById(idUser).select('follow -_id');
      const listFollow: Array<ChannelUser> = (
        await Promise.all(
          follow?.map(
            async (index) => await this.userService.findOne(index.toString()),
          ),
        )
      ).map(({ idUser, name, email, picture }) => {
        return { idUser, name, email, picture };
      });
      return response(listFollow, page, `follow/${idUser}?`);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'An unexpected error occurred while retrieving the user data.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
