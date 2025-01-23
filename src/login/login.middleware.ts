import { Request, Response, NextFunction } from 'express';

export function LoginMiddleware(
  request: Request<object, object, object>,
  response: Response,
  next: NextFunction,
) {
  next();
}
