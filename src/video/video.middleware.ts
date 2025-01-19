import { Request, Response, NextFunction } from 'express';
import { VideoReqBodyPatch } from 'src/interfaces/middlewares.interface';

export function VideoMiddleware(
  request: Request<object, object, VideoReqBodyPatch>,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };

  if (request.method === 'POST') {
    const { idUser, nameVideo, url } = request.body;

    if (!idUser || !idUser.trim().length) {
      return sendError('El campo "idUser" es obligatorio');
    }
    if (!nameVideo || !nameVideo.trim().length) {
      return sendError('El campo "nameVideo" es obligatorio');
    }
    if (!url || !url.trim().length) {
      return sendError('El campo "url" es obligatorio');
    }
  }

  if (request.method === 'PATCH') {
    const { idUser, nameVideo, url, stateVideo } = request.body;
    if (!idUser || !idUser.trim().length) {
      return sendError('El campo "idUser" es obligatorio');
    }
    if (!nameVideo || !nameVideo.trim().length) {
      return sendError('El campo "nameVideo" es obligatorio');
    }
    if (!url || !url.trim().length) {
      return sendError('El campo "url" es obligatorio');
    }
    if (stateVideo !== 'true' && stateVideo !== 'false') {
      return sendError('This state is not valid');
    }
  }

  next();
}
