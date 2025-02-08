import { Request, Response, NextFunction } from 'express';

export function SignMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };

  if (request.method === 'POST') {
    const { name, email, password } = request.body;
    if (!name || !name.trim().length) {
      return sendError('The "name" field is required.');
    }
    if (!email || !email.trim().length) {
      return sendError('The "email" field is required.');
    }
    if (!password || !password.trim().length) {
      return sendError('The "password" field is required.');
    }
  }

  if (request.method === 'PUT') {
    const { email, password } = request.body;
    if (!email || !email.trim().length) {
      return sendError('The "email" field is required.');
    }
    if (!password || !password.trim().length) {
      return sendError('The "password" field is required.');
    }
  }

  if (request.method === 'DELETE') {
    const urlParts = request.url.split('/');
    const idUser = urlParts[urlParts.length - 1];
    if (idUser.length < 10) {
      return sendError('The "idUser" parameter is required.');
    }
  }
  next();
}
