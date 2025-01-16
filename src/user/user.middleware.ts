import { Request, Response, NextFunction } from 'express';
import { UserRequestBody } from 'src/interfaces/middlewares.interface';

export function UserMiddleware(
  request: Request<object, object, UserRequestBody>,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };

  if (request.method === 'POST') {
    const { name, email, password } = request.body;

    if (!name || !name.trim().length) {
      return sendError('El campo "name" es obligatorio');
    }
    if (!email || !email.trim().length) {
      return sendError('El campo "email" es obligatorio');
    }
    if (!password || !password.trim().length) {
      return sendError('El campo "password" es obligatorio');
    }
  }

  if (request.method === 'PATCH') {
    const { name, email } = request.body;

    if (!name || !name.trim().length) {
      return sendError('El campo "name" es obligatorio');
    }
    if (!email || !email.trim().length) {
      return sendError('El campo "email" es obligatorio');
    }
  }

  next();
}
