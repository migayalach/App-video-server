import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from 'src/interfaces/login.interface';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async create(@Body() infoLogin: LoginDto): Promise<LoginResponse> {
    return await this.loginService.create(infoLogin);
  }
}
