import { Injectable } from '@nestjs/common';

@Injectable()
export class MyVideosService {
  async findOne(idUser: string) {
    return `This action returns a #${idUser} myVideo`;
  }
}
