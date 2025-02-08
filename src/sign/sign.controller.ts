import { Controller, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import {
  ExistEmail,
  UserCreated,
  UserDelete,
} from 'src/interfaces/user.interface';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  // !CREATE NEW ACCOUNT
  @Post('up')
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiBody({
    type: SignUpDto,
    description: 'Data required to create a new user account.',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    schema: {
      example: {
        message: 'User created successfully',
        user: {
          idUser: '67a642f1125b750bb327f491',
          name: 'Evo Morales Mamani',
          email: 'evitoMiLider@example.com',
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
    description: 'Email already exists. Please use a different email.',
    schema: {
      example: {
        status: 409,
        error: 'Sorry, this email already exists.',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while processing the request.',
    schema: {
      example: {
        status: 500,
        error:
          'An unexpected error occurred while processing the user creation.',
      },
    },
  })
  async create(@Body() infoUser: SignUpDto): Promise<UserCreated> {
    return await this.signService.create(infoUser);
  }

  // !ACCESS ACCOUNT
  @Put('in')
  @ApiOperation({ summary: 'Access acount' })
  @ApiBody({
    type: SignInDto,
    description: 'Data required to access the account.',
  })
  @ApiResponse({
    status: 200,
    description: 'User created successfully.',
    schema: {
      example: {
        user: {
          idUser: '67a642f1125b750bb327f491',
          name: 'Rafael',
          email: 'rafa@example.com',
          picture:
            'https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/432420703_3543043592676897_4605081499766177102_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JpqoLt7Xe94Q7kNvgGlqX2G&_nc_oc=AdhzZNLv_jPUFJ--zplFgYuhdsQPcAjuR-s3SIt_hva5bzat_l6GlE7uFjQ2ftbgR0s&_nc_zt=23&_nc_ht=scontent.flpb2-2.fna&_nc_gid=A6D9cczihiVtzNIsDFo97FE&oh=00_AYDc76sWsSunmx4vr0v9MaT-NqhHTOr1gxH9RFhol0acDw&oe=67AB69F1',
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
    status: 404,
    description: 'Resource not found',
    content: {
      'application/json': {
        examples: {
          userNotFound: {
            summary: "Email isn't valid",
            value: {
              statusCode: 404,
              message: 'Sorry, the email is not valid.',
            },
          },
          nameConflict: {
            summary: "Password isn't valid",
            value: {
              statusCode: 404,
              message: 'Sorry, the password is not valid.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while processing the request.',
    schema: {
      example: {
        status: 500,
        error:
          'An unexpected error occurred while processing the user creation.',
      },
    },
  })
  async update(@Body() infoUser: SignInDto): Promise<ExistEmail> {
    return await this.signService.update(infoUser);
  }

  // !SESSION CLOSED
  @Delete('out/:idUser')
  @ApiOperation({ summary: 'Session closed' })
  @ApiParam({
    name: 'idUser',
    description: "'idVideo' parameter to sesion closed",
    type: String,
    example: '67a6285ffbe090a04756be54',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully session closed',
    schema: {
      example: {
        message: 'Bye',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Resource not found',
    content: {
      'application/json': {
        examples: {
          requestIdUser: {
            summary: 'The "idUser" parameter is required.',
            value: {
              statusCode: 400,
              message: 'The "idUser" parameter is required.',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Sorry, this user doesn't exists",
    schema: {
      example: {
        status: 404,
        message: "Sorry, this user doesn't exists",
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An unexpected error occurred while logging out.',
    schema: {
      example: {
        status: 500,
        error: 'An unexpected error occurred while logging out.',
      },
    },
  })
  async remove(@Param('idUser') idUser: string): Promise<UserDelete> {
    return await this.signService.delete(idUser);
  }
}
