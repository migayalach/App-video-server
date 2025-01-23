import { Request, Response, NextFunction } from 'express';
import { Follow } from 'src/enums/follow.enum';
import { FollowReqBody } from 'src/interfaces/middlewares.interface';

export function FollowMiddleware(
  request: Request<object, object, FollowReqBody>,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };

  if (request.method === 'POST') {
    const { idUser, idCreador, option } = request.body;
    if (!idUser || !idUser.trim().length) {
      return sendError('El campo "idUser" es obligatorio');
    }
    if (!idCreador || !idCreador.trim().length) {
      return sendError('El campo "idCreator" es obligatorio');
    }
    if (
      !option ||
      !option.trim().length ||
      (option !== Follow.Adding && option !== Follow.Delete)
    ) {
      return sendError('El campo "option" es obligatorio');
    }
  }

  next();
}
