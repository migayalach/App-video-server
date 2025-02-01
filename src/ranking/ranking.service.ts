import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ranking } from './schema/ranking.schema';
import { Model, Types } from 'mongoose';
import { totalAverange } from 'src/utils/operations.util';

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

  async findOne(idVideo: string) {
    try {
      const infoAverage = await this.rankingModel
        .findOne({
          idVideo: new Types.ObjectId(idVideo),
        })
        .select('_id average');
      return infoAverage;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while updating the ranking.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(idRanking: string, information: UpdateRankingDto) {
    try {
      const ranking = await this.rankingModel.findOneAndUpdate(
        {
          _id: idRanking,
          'listVotes.idUser': information.idUser,
        },
        information.qualification === 0
          ? { $pull: { listVotes: { idUser: information.idUser } } }
          : {
              $set: {
                'listVotes.$.qualification': Number(information.qualification),
              },
            },
        { new: true },
      );

      if (!ranking && information.qualification !== 0) {
        await this.rankingModel.findByIdAndUpdate(idRanking, {
          $push: {
            listVotes: {
              idUser: information.idUser,
              qualification: information.qualification,
            },
          },
        });
      }

      const updatedRanking = await this.rankingModel.findById(idRanking);
      const average = totalAverange(updatedRanking.listVotes);

      await this.rankingModel.findByIdAndUpdate(
        idRanking,
        { $set: { average } },
        { new: true },
      );

      return {
        message: 'Registered ranking.',
        average,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while updating the ranking.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
