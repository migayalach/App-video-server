import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh-token')
  async create(@Body() createRefreshTokenDto: LoginDto) {
    return await this.authService.create(createRefreshTokenDto);
  }
}
