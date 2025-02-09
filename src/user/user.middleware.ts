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
      return sendError('The "name" field is required');
    }
    if (!email || !email.trim().length) {
      return sendError('The "email" field is required');
    }
    if (!password || !password.trim().length) {
      return sendError('The "password" field is required');
    }
  }

  if (request.method === 'PATCH') {
    const { name, email } = request.body;

    if (!name || !name.trim().length) {
      return sendError('The "name" field is required');
    }
    if (!email || !email.trim().length) {
      return sendError('The "email" field is required');
    }
  }

  next();
}
