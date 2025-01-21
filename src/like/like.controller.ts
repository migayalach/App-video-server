import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { VideoResponse } from 'src/interfaces/video.interface';
import { Response } from 'src/interfaces/response.interface';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async create(@Body() infoLike: CreateLikeDto): Promise<VideoResponse> {
    return await this.likeService.create(infoLike);
  }

  @Get(':idUser')
  async findOne(
    @Param('idUser') idUser: string,
    @Query('page') page: string,
  ): Promise<Response> {
    return await this.likeService.findOne(idUser, +page);
  }

  @Delete(':idLike')
  async remove(@Param('idLike') idLike: string): Promise<VideoResponse> {
    return await this.likeService.remove(idLike);
  }
}
