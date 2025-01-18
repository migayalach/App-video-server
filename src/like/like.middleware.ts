import { Request, Response, NextFunction } from 'express';

export function LikeMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };

  if (request.method === 'POST') {
    const { idUser, idVideo } = request.body;
    if (!idUser || !idUser.trim().length) {
      return sendError('El campo "idUser" es obligatorio');
    }
    if (!idVideo || !idVideo.trim().length) {
      return sendError('El campo "idVideo" es obligatorio');
    }
  }
  next();
}
