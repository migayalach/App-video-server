import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginResponse } from 'src/interfaces/login.interface';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(infoLogin: LoginDto): Promise<LoginResponse> {
    try {
      const infoData = await this.userModel.findOne({ email: infoLogin.email });
      if (!infoData) {
        throw new HttpException(
          `Sorry, the email is not valid.`,
          HttpStatus.NOT_FOUND,
        );
      }
      const isMatch = await bcrypt.compare(
        infoLogin.password,
        infoData.password,
      );
      if (!isMatch) {
        throw new HttpException(
          `Sorry, the password is not valid.`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        access: true,
        idUser: infoData._id.toString(),
        nameUser: infoData.name,
        // photoUser: infoData.photoUser,
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
