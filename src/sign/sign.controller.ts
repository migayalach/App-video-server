import { Controller, Post, Body, Put } from '@nestjs/common';
import { SignService } from './sign.service';
import { CreateSignDto } from './dto/create-sign.dto';
import { UpdateSignDto } from './dto/update-sign.dto';

@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Post('up')
  create(@Body() createSignDto: CreateSignDto) {
    return this.signService.create(createSignDto);
  }

  @Put('in')
  update(@Body() updateSignDto: UpdateSignDto) {
    return this.signService.update(updateSignDto);
  }
}
