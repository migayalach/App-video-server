import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { Audit } from './schemas/audit.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuditState } from 'src/enums/audit.enum';
import { UserService } from 'src/user/user.service';
import { response } from 'src/utils/response.util';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(Audit.name) private auditModel: Model<Audit>,
    private userService: UserService,
  ) {}
  async create(information: CreateAuditDto): Promise<any> {
    try {
      const createAudit = new this.auditModel({
        ...information,
        idUser: new Types.ObjectId(information.idUser),
        idVideo: new Types.ObjectId(information.idVideo),
        changes:
          information.action === AuditState.Update ? information.changes : {},
      });
      return await createAudit.save();
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

  async findAll(idUser: string, page?: number): Promise<any> {
    try {
      if (!page) {
        page = 1;
      }
      await this.userService.findOne(idUser);
      const auditData = await this.auditModel
        .find({
          idUser: new Types.ObjectId(idUser),
        })
        .select('-__v -idUser -changes')
        .populate('idVideo', 'nameVideo');
      return response(auditData, page, `audit?idUser=${idUser}&`);
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

  async findOne(idAudit: string): Promise<any> {
    try {
      const auditData = await this.auditModel
        .findById(idAudit)
        .select('-__v -idUser')
        .populate('idVideo', '-__v -idUser');
      return auditData;
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
