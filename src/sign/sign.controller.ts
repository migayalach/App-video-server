import { Controller, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Post('up')
  async create(@Body() infoUser: SignUpDto) {
    return await this.signService.create(infoUser);
  }

  @Put('in')
  async update(@Body() infoUser: SignInDto) {
    return await this.signService.update(infoUser);
  }

  @Delete('out/:idUser')
  async remove(@Param('idUser') idUser: string) {
    return await this.signService.delete(idUser);
  }
}
