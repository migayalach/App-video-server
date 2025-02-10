import { Request, Response, NextFunction } from 'express';

export function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };
  if (request.method === 'POST') {
    const { idUser, refreshToken } = request.body;
    if (idUser.length < 10) {
      return sendError('The "idUser" field is required.');
    }
    if (!refreshToken || !refreshToken.trim().length) {
      return sendError('The "refreshToken" field is required.');
    }
  }

  next();
}
