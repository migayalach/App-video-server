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
      return sendError('The "idUser" field is required.');
    }
    if (!nameVideo || !nameVideo.trim().length) {
      return sendError('The "nameVideo" field is required.');
    }
    if (!url || !url.trim().length) {
      return sendError('The "url" field is required.');
    }
  }

  if (request.method === 'PATCH') {
    const { idUser, nameVideo, url } = request.body;
    if (!idUser || !idUser.trim().length) {
      return sendError('The "idUser" field is required.');
    }
    if (!nameVideo || !nameVideo.trim().length) {
      return sendError('The "nameVideo" field is required.');
    }
    if (!url || !url.trim().length) {
      return sendError('The "url" field is required.');
    }
  }

  next();
}
