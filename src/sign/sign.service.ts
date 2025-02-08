import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { UserService } from 'src/user/user.service';
import {
  ExistEmail,
  UserCreated,
  UserDelete,
} from 'src/interfaces/user.interface';

@Injectable()
export class SignService {
  constructor(private userService: UserService) {}

  async create(infoUser: SignUpDto): Promise<UserCreated> {
    try {
      return await this.userService.create(infoUser);
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

  async update(infoUser: SignInDto): Promise<ExistEmail> {
    try {
      return await this.userService.emailExist(
        infoUser.email,
        infoUser.password,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while searching for the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(idUser: string): Promise<UserDelete> {
    try {
      await this.userService.delete(idUser);
      return {
        message: 'Bye',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while logging out.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
