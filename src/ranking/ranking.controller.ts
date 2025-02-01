import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Post()
  async create(@Body() createRankingDto: CreateRankingDto) {
    return await this.rankingService.create(createRankingDto);
  }

  @Patch(':idRanking')
  async update(
    @Param('idRanking') idRanking: string,
    @Body() updateRankingDto: UpdateRankingDto,
  ) {
    return await this.rankingService.update(idRanking, updateRankingDto);
  }
}
