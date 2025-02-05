import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse, UserData } from 'src/interfaces/user.interface';
import { Response } from '../interfaces/response.interface';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // !CREATE USER
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto, description: 'User creation data' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    schema: {
      example: {
        message: 'User created successfully',
        user: {
          idUser: '678e730e45b56f4dad365a3c',
          name: 'Nicolas',
          email: 'nicolasMiau@example.com',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({
    status: 404,
    description: 'Sorry, this email currently exists.',
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while searching for the user.',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.create(createUserDto);
  }

  // !GET ALL USER
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get list user' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User pagination and response',
    schema: {
      example: {
        info: {
          count: 27,
          pages: 2,
          next: 'http://localhost:3001/app-video/user?page=2',
          prev: null,
        },
        results: [
          {
            idUser: '678726a888a21c3097b5c5d1',
            name: 'Miguel',
            email: 'ayalachavezmiguel@gmail.com',
            follow: [],
          },
          {
            idUser: '6787c139d67c1c00e1758f88',
            name: 'Laura',
            email: 'laura.gomez@example.com',
            follow: [],
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred.',
  })
  async findAll(@Query('page') page: string): Promise<Response> {
    return await this.userService.findAll(+page);
  }

  // !GET IDUSER INFORMATION
  @UseGuards(AuthGuard)
  @Get(':idUser')
  @ApiOperation({ summary: 'Get user information' })
  @ApiParam({
    name: 'idUser',
    description: "'idUser' parameter to search the database and get all data.",
    type: String,
    example: '678726a888a21c3097b5c5d1',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been obtained successfully',
    schema: {
      example: {
        idUser: '678726a888a21c3097b5c5d1',
        name: 'Miguel',
        email: 'ayalachavezmiguel@gmail.com',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this user doesn't exists.",
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while searching for the user.',
  })
  async findOne(@Param('idUser') idUser: string): Promise<UserData> {
    return await this.userService.findOne(idUser);
  }

  // !UPDATE PERSONAL INFORMATION
  @UseGuards(AuthGuard)
  @Patch(':idUser')
  @ApiOperation({ summary: 'Update personal information user' })
  @ApiParam({
    name: 'idUser',
    description: "'idUser' parameter to search the database and get data.",
    type: String,
    example: '678726a888a21c3097b5c5d1',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    schema: {
      example: {
        message: 'User updated successfully',
        user: {
          idUser: '678e730e45b56f4dad365a3c',
          name: 'Nicolas',
          email: 'nicolasMiau@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this user doesn't exists.",
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while searching for the user.',
  })
  async update(
    @Param('idUser') idUser: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return await this.userService.update(idUser, updateUserDto);
  }
}
