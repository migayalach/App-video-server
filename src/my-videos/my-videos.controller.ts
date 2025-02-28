import { Controller, Get, Param } from '@nestjs/common';
import { MyVideosService } from './my-videos.service';

@Controller('my-videos')
export class MyVideosController {
  constructor(private readonly myVideosService: MyVideosService) {}

  @Get(':idUser')
  async findOne(@Param('idUser') idUser: string) {
    return await this.myVideosService.findOne(idUser);
  }
}
