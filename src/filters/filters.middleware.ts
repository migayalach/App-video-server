import { NextFunction, Request, Response } from 'express';

export function FiltersMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };
  if (request.method === 'GET') {
    const data = request.url.split('=');
    const search = data[1].split('&');
    if (search[0] === 'audit') {
      const [user] = data[2].split(',');
      const infoPerson = user.slice(4, user.length - 3).split('%');
      if (infoPerson[2].length < 15) {
        return sendError('Please introduce your identification.');
      }
    }
  }
  next();
}
