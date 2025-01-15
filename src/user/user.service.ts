import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserResponse, UserData } from 'src/interfaces/user.interface';
import { response } from 'src/utils/response.util';
import { Response } from 'src/interfaces/response.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(infoUser: CreateUserDto): Promise<UserResponse> {
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
      const { _id } = await createUser.save();

      return {
        message: 'User created successfully',
        user: await this.findOne(_id as string),
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
      const results = await this.userModel.find().select('-password -__v');
      if (!page) {
        page = 1;
      }
      return response(results, page, 'user?');
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

  async findOne(idUser: string): Promise<UserData> {
    try {
      const infoUser = await this.userModel
        .findById(idUser)
        .select('-password -follow');
      if (!infoUser) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Sorry, this user don't exists.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        idUser: infoUser._id.toString(),
        name: infoUser.name,
        email: infoUser.email,
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

  async update(
    idUser: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    try {
      await this.findOne(idUser);
      await this.userModel.findByIdAndUpdate(idUser, updateUserDto);
      return {
        message: 'User updated successfully',
        user: await this.findOne(idUser),
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
}
