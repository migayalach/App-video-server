import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { AuthToken } from './authToken';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authToken: AuthToken,
  ) {}
  async refreshToken(userInfo: RefreshTokenDto) {
    try {
      const tokenInfo = await this.userModel
        .findById(userInfo.idUser)
        .select('-password');
      if (!tokenInfo) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User not found.',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (userInfo.refreshToken !== tokenInfo.token) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Sorry, this token is expired, please iniciate sesion.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.authToken.generateToken(
        tokenInfo._id.toString(),
        tokenInfo.name,
      );
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
}
