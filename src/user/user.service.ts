import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(infoUser: CreateUserDto): Promise<User> {
    try {
      const existEmail = await this.userModel.findOne({
        email: infoUser.email,
      });
      if (existEmail) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Sorry, this email currently exists.',
          },
          HttpStatus.CONFLICT,
        );
      }
      infoUser = {
        ...infoUser,
        password: await bcrypt.hash(infoUser.password, 10),
      };
      const createUser = new this.userModel(infoUser);
      return await createUser.save();
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return { a: `This action updates a #${id} user`, b: updateUserDto };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
