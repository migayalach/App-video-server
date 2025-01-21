import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { response } from 'src/utils/response.util';
import { Follow } from 'src/enums/follow.enum';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private userService: UserService,
  ) {}

  async create(dataFollow: CreateFollowDto) {
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
              error: `Sorry, you are already following this creator.`,
            },
            HttpStatus.CONFLICT,
          );
        }
        await this.UserModel.findByIdAndUpdate(dataFollow.idUser, {
          $push: { follow: new Types.ObjectId(dataFollow.idCreador) },
        });
      }
      return {
        message:
          dataFollow.option === Follow.Adding
            ? 'Follow this channel'
            : 'Unfollow this channel',
        creator: await this.userService.findOne(
          dataFollow.idCreador.toString(),
        ),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while search the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(idUser: string, page?: number) {
    try {
      if (!page) {
        page = 1;
      }
      const { follow } =
        await this.UserModel.findById(idUser).select('follow -_id');
      const listFollow = await Promise.all(
        follow?.map(
          async (index) => await this.userService.findOne(index.toString()),
        ),
      );
      return response(listFollow, page, `follow/${idUser}?`);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while search the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
