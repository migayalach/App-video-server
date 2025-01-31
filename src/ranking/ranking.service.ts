import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ranking } from './schema/ranking.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class RankingService {
  constructor(
    @InjectModel(Ranking.name) private rankingModel: Model<Ranking>,
  ) {}
  async create(infomation: CreateRankingDto) {
    try {
      const createRanking = new this.rankingModel({
        idVideo: new Types.ObjectId(infomation.idVideo),
      });
      await createRanking.save();
      return;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while creating the user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return `This action returns all ranking`;
  }

  async update(id: string, infomation: UpdateRankingDto) {
    return `This action updates a #${id} ${infomation}ranking`;
  }
}
