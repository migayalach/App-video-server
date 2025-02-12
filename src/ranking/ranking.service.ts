import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ranking } from './schema/ranking.schema';
import { Model, Types } from 'mongoose';
import { totalAverange } from 'src/utils/operations.util';
import {
  GetIdRanking,
  rankingResponseUpdate,
} from 'src/interfaces/ranking.interface';

@Injectable()
export class RankingService {
  constructor(
    @InjectModel(Ranking.name) private rankingModel: Model<Ranking>,
  ) {}
  async create(infomation: CreateRankingDto): Promise<{ message: string }> {
    try {
      const createRanking = new this.rankingModel({
        idUser: new Types.ObjectId(infomation.idUser),
        idVideo: new Types.ObjectId(infomation.idVideo),
      });
      await createRanking.save();
      return {
        message: `Create successfully.`,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An unexpected error occurred while creating the ranking.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(idVideo: string): Promise<GetIdRanking> {
    try {
      const infoAverage = await this.rankingModel
        .findOne({
          idVideo: new Types.ObjectId(idVideo),
        })
        .select('_id average');
      return { _id: infoAverage._id.toString(), average: infoAverage.average };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An unexpected error occurred while searching for the item.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    idRanking: string,
    information: UpdateRankingDto,
  ): Promise<rankingResponseUpdate> {
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
        average: 0,
      };
    } catch (error) {
      console.log(error);

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

  async delete(idRanking: string) {
    return await this.rankingModel.findByIdAndDelete(idRanking);
  }
}
