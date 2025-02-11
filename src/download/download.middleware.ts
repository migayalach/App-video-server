import { NextFunction, Request, Response } from 'express';
import {
  DownloadFormat,
  MP3Quality,
  VideoQuality,
} from 'src/enums/download.enum';

export function DownloadMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const sendError = (message: string) => {
    response.status(400).json({ status: 400, message });
  };
  if (request.method === 'GET') {
    const data = request.url.split('&');
    const url = data[0].slice(2, data[0].length);
    if (url.length < 10) {
      return sendError('Very short url.');
    }

    const format = data[2].split('=');
    if (!Object.values(DownloadFormat).includes(format[1])) {
      return sendError('Format is not available at the moment.');
    }

    const quality = data[1].split('=');
    if (format[1] === 'mp3') {
      if (!Object.values(MP3Quality).includes(quality[1] as MP3Quality)) {
        return sendError('Quality is not available at the moment.');
      }
    } else if (format[1] === 'mp4') {
      if (!Object.values(VideoQuality).includes(quality[1])) {
        return sendError('Quality is not available at the moment.');
      }
    }
  }

  next();
}
