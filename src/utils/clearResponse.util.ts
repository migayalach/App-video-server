import { LikeResponseGetAll } from 'src/interfaces/like.interface';
import { OneVideoResponse, VideoInfo } from 'src/interfaces/video.interface';

export const clearVideoRes = ({
  _id,
  idUser,
  nameVideo,
  description,
  image,
  url,
  stateVideo,
  dateCreate,
  usersLike,
  isDelete,
}): OneVideoResponse => {
  return {
    idVideo: _id?.toString(),
    idUser: idUser?.toString(),
    idRanking: '',
    nameVideo: nameVideo,
    description: description,
    image: image,
    url: url,
    stateVideo: stateVideo,
    dateCreate: dateCreate,
    average: 0,
    usersLike,
    isDelete,
  };
};

export const clearResVideos = (
  results: Array<VideoInfo>,
): Array<OneVideoResponse> => {
  const data = [];
  for (let index = 0; index < results.length; index++) {
    data.push(clearVideoRes(results[index]));
  }
  return data;
};

export const clearListVideoLike = (
  list: Array<any>,
): Array<LikeResponseGetAll> => {
  return list.map(({ _id, idVideo }) => {
    return {
      idLike: _id,
      video: idVideo,
    };
  });
};
