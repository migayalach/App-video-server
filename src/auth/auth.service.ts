import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(infoLogin: LoginDto): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email: infoLogin.email });
      if (!user) {
        throw new HttpException(
          `Sorry, the email is not valid.`,
          HttpStatus.NOT_FOUND,
        );
      }
      const isMatch = await bcrypt.compare(infoLogin.password, user.password);
      if (!isMatch) {
        throw new HttpException(
          `Sorry, the password is not valid.`,
          HttpStatus.NOT_FOUND,
        );
      }

      const payload = { username: user.name, sub: user._id };
      return {
        access: true,
        idUser: user._id.toString(),
        nameUser: user.name,
        access_token: await this.jwtService.signAsync(payload),
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
