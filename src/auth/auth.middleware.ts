import { Request, Response, NextFunction } from 'express';
import { LoginData } from 'src/interfaces/middlewares.interface';

export function AuthMiddleware(
  request: Request<object, object, LoginData>,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };
  if (request.method === 'POST') {
    const { email, password } = request.body;
    if (!email || !email.trim().length) {
      return sendError('El campo "email" es obligatorio');
    }
    if (!password || !password.trim().length) {
      return sendError('El campo "password" es obligatorio');
    }
  }

  next();
}
