import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      // Aquí comparamos el idUser del token con el idUser del parámetro de la ruta
      const userIdFromToken = payload.sub; // O la propiedad que uses en el token
      const userIdFromParams = request.params.idUser;

      if (userIdFromToken !== userIdFromParams) {
        throw new UnauthorizedException('Invalid token for this user');
      }

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(`Invalid or expired token: ${error}`);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
