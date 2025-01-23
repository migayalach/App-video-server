import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  async create(infoLogin: LoginDto): Promise<any> {
    return await infoLogin;
  }
}
