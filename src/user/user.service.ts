import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {
  UserDelete,
  UserData,
  UserUpdate,
  UserCreated,
  ExistEmail,
} from 'src/interfaces/user.interface';
import { response } from 'src/utils/response.util';
import { Response } from 'src/interfaces/response.interface';
import { AuthToken } from 'src/auth/authToken';
import { urlWithOutImage } from '../../constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private token: AuthToken,
  ) {}

  private async getAllFollow(list: Array<string | ObjectId>) {
    return await Promise.all(
      list.map(async (index: string | ObjectId) => {
        const { _id, name, picture } = await this.userModel.findById(index);
        return {
          idCreator: _id.toString(),
          nameCreator: name,
          pictureCreator: picture,
        };
      }),
    );
  }

  async databaseSize(): Promise<number> {
    return await this.userModel.countDocuments();
  }

  async emailExist(email: string, password: string): Promise<ExistEmail> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Sorry, the email is not valid.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Sorry, the password is not valid.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const { access_token, refresh_token } = await this.token.generateToken(
      user._id.toString(),
      user.name,
    );

    await this.userModel.findByIdAndUpdate(user._id, { token: refresh_token });
    return {
      idUser: user._id.toString(),
      name: user.name,
      email: user.email,
      picture: user.picture,
      follow: [],
      access_token,
      refresh_token,
    };
  }

  async create(infoUser: CreateUserDto): Promise<UserCreated> {
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
        picture: !infoUser.picture.length ? urlWithOutImage : infoUser.picture,
      };
      const createUser = new this.userModel(infoUser);
      const { _id, name } = await createUser.save();
      const { access_token, refresh_token } = await this.token.generateToken(
        _id.toString(),
        name,
      );
      await this.userModel.findByIdAndUpdate(_id, { token: refresh_token });
      return {
        message: 'User created successfully',
        user: await this.findOne(_id as string),
        token: {
          access_token,
          refresh_token,
        },
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
      const results = await Promise.all(
        (await this.userModel.find().select('-password -__v')).map(
          async ({ _id, name, email, picture, follow }) => {
            return {
              idUser: _id.toString(),
              name,
              email,
              picture,
              follow: await this.getAllFollow(
                follow.map((index) => index.toString()),
              ),
            };
          },
        ),
      );

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
          error: 'An unexpected error occurred while search the users.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(idUser: string): Promise<UserData> {
    try {
      const infoUser = await this.userModel
        .findById(idUser)
        .select('-password');
      if (!infoUser) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Sorry, this user doesn't exists.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        idUser: infoUser._id.toString(),
        name: infoUser.name,
        email: infoUser.email,
        picture: infoUser.picture,
        follow: await this.getAllFollow(
          infoUser.follow.map((index) => index.toString()),
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

  async update(
    idUser: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserUpdate> {
    try {
      await this.findOne(idUser);
      await this.userModel.findByIdAndUpdate(idUser, {
        ...updateUserDto,
        picture: !updateUserDto.picture.length
          ? urlWithOutImage
          : updateUserDto.picture,
      });
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
          error: 'An unexpected error occurred while update the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(idUser: string): Promise<UserDelete> {
    try {
      await this.findOne(idUser);
      await this.userModel.findByIdAndUpdate(idUser, {
        $unset: { token: '' },
      });
      return {
        message: 'User successfully deleted',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while delete the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
