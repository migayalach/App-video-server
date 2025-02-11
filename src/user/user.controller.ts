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
import {
  UserData,
  UserCreated,
  UserUpdate,
} from 'src/interfaces/user.interface';
import { Response } from '../interfaces/response.interface';
import {
  ApiBearerAuth,
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
          picture:
            'https://www.swissinfo.ch/content/wp-content/uploads/sites/13/2010/01/5a71e033b824c835f83fc6d86df9d23d-evo_morales-8133012-data.jpg?crop=0px,30px,3020px,2014px&w=880&ver=27c1ca2d',
          follow: [],
        },
        token: {
          access_token: 'aaabbbccc.xxxyyyzzz.mmmnnnooo', // This is a JWT access token, used for authenticated requests
          refresh_token: '123aaa456.xxx789zzz.mmmnnn1010', // Refresh token used to obtain a new access token when expired
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Resource not found',
    content: {
      'application/json': {
        examples: {
          requestName: {
            summary: "The 'name' field is required.",
            value: {
              statusCode: 400,
              message: "The 'name' field is required.",
            },
          },
          requestEmail: {
            summary: "The 'email' field is required.",
            value: {
              statusCode: 400,
              message: "The 'email' field is required.",
            },
          },
          requestPassword: {
            summary: "The 'password' field is required.",
            value: {
              statusCode: 400,
              message: "The 'password' field is required.",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Sorry, this email currently exists.',
    schema: {
      example: {
        status: 409,
        message: 'Sorry, this email currently exists.',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while processing the request.',
    schema: {
      example: {
        status: 500,
        message:
          'An unexpected error occurred while processing the user creation.',
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserCreated> {
    return await this.userService.create(createUserDto);
  }

  // !GET ALL USER
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
    description: 'An unexpected error occurred while processing the request.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while search the users.',
      },
    },
  })
  async findAll(@Query('page') page: string): Promise<Response> {
    return await this.userService.findAll(+page);
  }

  // !GET IDUSER INFORMATION
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
    status: 401,
    description: 'Invalid or expired token',
    schema: {
      example: {
        status: 401,
        message: 'Invalid or expired token: TokenExpiredError: jwt expired',
        error: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this user doesn't exists.",
    schema: {
      example: {
        status: 404,
        message: "Sorry, this user doesn't exists.",
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while processing the request.',
    schema: {
      example: {
        status: 500,
        message: 'An unexpected error occurred while search the user.',
      },
    },
  })
  async findOne(@Param('idUser') idUser: string): Promise<UserData> {
    return await this.userService.findOne(idUser);
  }

  // !UPDATE PERSONAL INFORMATION
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
    status: 400,
    description: 'Resource not found',
    content: {
      'application/json': {
        examples: {
          requestName: {
            summary: "The 'name' field is required.",
            value: {
              statusCode: 400,
              message: "The 'name' field is required.",
            },
          },
          requestEmail: {
            summary: "The 'email' field is required.",
            value: {
              statusCode: 400,
              message: "The 'email' field is required.",
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired token',
    schema: {
      example: {
        status: 401,
        message: 'Invalid or expired token: TokenExpiredError: jwt expired',
        error: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this user doesn't exists.",
    schema: {
      example: {
        status: 404,
        error: "Sorry, this user doesn't exists.",
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while processing the request.',
    schema: {
      example: {
        status: 500,
        error: 'An unexpected error occurred while search the user.',
      },
    },
  })
  async update(
    @Param('idUser') idUser: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserUpdate> {
    return await this.userService.update(idUser, updateUserDto);
  }
}
