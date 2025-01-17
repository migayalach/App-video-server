import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  async create(infoVideo: CreateVideoDto) {
    return await 'This action adds a new video';
  }

  async findAll() {
    return await `This action returns all video`;
  }

  async findOne(id: string) {
    return await `This action returns a #${id} video`;
  }

  async update(id: string, infoVideo: UpdateVideoDto) {
    return await `This action updates a #${id} video`;
  }

  async remove(id: string) {
    return await `This action removes a #${id} video`;
  }
}
