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
    const tokenInfo = await this.userModel
      .findById(userInfo.idUser)
      .select('-password');
    if (userInfo.refreshToken !== tokenInfo.token) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Sorry, this token is expired, please iniciate sesion.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.authToken.generateToken(
      tokenInfo._id.toString(),
      tokenInfo.name,
    );
  }
}
