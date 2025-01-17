import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async create(@Body() infoVideo: CreateVideoDto): Promise<any> {
    return await this.videoService.create(infoVideo);
  }

  @Get()
  async findAll(@Query('page') page: string): Promise<any> {
    return await this.videoService.findAll(+page);
  }

  @Get(':idVideo')
  async findOne(@Param('idVideo') idVideo: string): Promise<any> {
    return await this.videoService.findOne(idVideo);
  }

  @Patch(':idVideo')
  async update(
    @Param('idVideo') idVideo: string,
    @Body() infoVideo: UpdateVideoDto,
  ): Promise<any> {
    return await this.videoService.update(idVideo, infoVideo);
  }

  @Delete(':idVideo')
  async remove(@Param('idVideo') idVideo: string): Promise<any> {
    return await this.videoService.remove(idVideo);
  }
}
