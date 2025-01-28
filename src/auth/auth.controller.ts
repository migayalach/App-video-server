import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { RefreshTokenGuard } from './refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async create(@Body() userInfo: RefreshTokenDto) {
    return await this.authService.refreshToken(userInfo);
  }
}
