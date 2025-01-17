import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  async create(infoLike: CreateLikeDto) {
    return await infoLike;
  }

  async findOne(idUser: string) {
    return await `This action returns a #${idUser} like`;
  }

  async remove(idVideo: string) {
    return await `This action removes a #${idVideo} like`;
  }
}
