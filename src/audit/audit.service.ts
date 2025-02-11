import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { Audit } from './schemas/audit.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuditState } from 'src/enums/audit.enum';
import { UserService } from 'src/user/user.service';
import { response } from 'src/utils/response.util';
import { Response } from 'src/interfaces/response.interface';
import { VideoCreateAudit } from 'src/interfaces/audit.interface';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(Audit.name) private auditModel: Model<Audit>,
    private userService: UserService,
  ) {}

  async create(information: CreateAuditDto): Promise<VideoCreateAudit> {
    try {
      const createAudit = new this.auditModel({
        ...information,
        idUser: new Types.ObjectId(information.idUser),
        idVideo: new Types.ObjectId(information.idVideo),
        changes:
          information.action === AuditState.Update ? information.changes : {},
      });
      const data = await createAudit.save();

      return {
        idUser: data.idUser.toString(),
        idVideo: data.idVideo.toString(),
        action: data.action as AuditState,
        _id: data._id.toString(),
        timeChanges: data.timeChanges,
        timeOnly: data.timeOnly,
        __v: data.__v,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while creating the audit.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    idUser: string,
    idVideo: string,
    page?: number,
  ): Promise<Response> {
    try {
      if (!page) {
        page = 1;
      }
      if (!Types.ObjectId.isValid(idUser)) {
        throw new HttpException(
          'Invalid idUser format',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!Types.ObjectId.isValid(idVideo)) {
        throw new HttpException(
          'Invalid idVideo format',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.userService.findOne(idUser);
      const auditData = await this.auditModel
        .find({
          idVideo: new Types.ObjectId(idVideo),
        })
        .select('-__v -idUser');
      return response(auditData, page, `audit/${idUser}/${idVideo}?`);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while creating the audit.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
