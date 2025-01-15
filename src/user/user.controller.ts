import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse, UserData } from 'src/interfaces/user.interface';
import { Response } from '../interfaces/response.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('page') page: string): Promise<Response> {
    return await this.userService.findAll(+page);
  }

  @Get(':idUser')
  async findOne(@Param('idUser') idUser: string): Promise<UserData> {
    return await this.userService.findOne(idUser);
  }

  @Patch(':idUser')
  async update(
    @Param('idUser') idUser: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return await this.userService.update(idUser, updateUserDto);
  }
}
