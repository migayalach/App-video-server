import { Injectable } from '@nestjs/common';
import { CreateSignDto } from './dto/create-sign.dto';
import { UpdateSignDto } from './dto/update-sign.dto';

@Injectable()
export class SignService {
  create(createSignDto: CreateSignDto) {
    return 'sign up';
  }

  update(updateSignDto: UpdateSignDto) {
    return `sign in`;
  }
}
