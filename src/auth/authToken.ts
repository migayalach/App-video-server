import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthToken {
  constructor(private jwtService: JwtService) {}

  async generateToken(idUser: string, name: string): Promise<any> {
    const payload = { username: name, sub: idUser };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
