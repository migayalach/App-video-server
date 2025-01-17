import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async create(@Body() infoLike: CreateLikeDto): Promise<any> {
    return await this.likeService.create(infoLike);
  }

  @Get(':idUser')
  async findOne(@Param('idUser') idUser: string): Promise<any> {
    return await this.likeService.findOne(idUser);
  }

  @Delete(':idVideo')
  async remove(@Param('idVideo') idVideo: string): Promise<any> {
    return await this.likeService.remove(idVideo);
  }
}
