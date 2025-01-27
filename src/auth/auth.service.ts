import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  create(createRefreshTokenDto) {
    return 'This action adds a new refreshToken';
  }
}
