import { Request, Response, NextFunction } from 'express';

export function AuditMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };

  if (request.method === 'GET') {
    const urlParts = request.url.split('/');
    for (let i = 1; i < urlParts.length; i++) {
      if (urlParts[i].length < 20) {
        return sendError('The parameter is required.');
      }
    }
  }
  next();
}
