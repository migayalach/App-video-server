import { Request, Response, NextFunction } from 'express';

export function VideoMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  next();
}
