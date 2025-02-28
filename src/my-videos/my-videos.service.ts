import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MyVideosService {
  async findOne(idUser: string) {
    try {
      return `This action returns a #${idUser} myVideo`;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error:
            'An unexpected error occurred while searching for your favorite videos.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
