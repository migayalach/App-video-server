import { Request, Response, NextFunction } from 'express';

export function RankingMiddleware(
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
      return sendError('The "idUser" field is required.');
    }
    if (!idVideo || !idVideo.trim().length) {
      return sendError('The "idVideo" field is required.');
    }
  }

  if (request.method === 'PATCH') {
    const { idUser, qualification } = request.body;
    if (!idUser || !idUser.trim().length) {
      return sendError('The "idUser" field is required.');
    }
    if (parseInt(qualification) < 0 || parseInt(qualification) > 5) {
      return sendError('The minimum rating is 0 and the maximum rating is 5.');
    }
  }
  next();
}
