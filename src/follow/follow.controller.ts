import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get(':idUser')
  async findAll(@Param('idUser') idUser: string, @Query('page') page: string) {
    return await this.followService.findAll(idUser, +page);
  }

  @Post()
  async create(@Body() dataFollow: CreateFollowDto): Promise<any> {
    return await this.followService.create(dataFollow);
  }
}
