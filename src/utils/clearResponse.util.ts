import { VideoInfo, VideoResponseClear } from 'src/interfaces/video.interface';

export const clearVideoRes = ({
  _id,
  idUser,
  nameVideo,
  description,
  url,
  stateVideo,
  dateCreate,
}): VideoResponseClear => {
  return {
    idVideo: _id,
    idUser: idUser,
    nameVideo: nameVideo,
    description: description,
    url: url,
    stateVideo: stateVideo,
    dateCreate: dateCreate,
  };
};

export const clearResVideos = (
  results: Array<VideoInfo>,
): Array<VideoResponseClear> => {
  const data = [];
  for (let index = 0; index < results.length; index++) {
    data.push(clearVideoRes(results[index]));
  }
  return data;
};
