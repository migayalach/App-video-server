import { LikeResponseGetAll } from 'src/interfaces/like.interface';
import { OneVideoResponse, VideoInfo } from 'src/interfaces/video.interface';

export const clearVideoRes = ({
  _id,
  idUser,
  nameVideo,
  description,
  url,
  stateVideo,
  dateCreate,
  isDelete,
}): OneVideoResponse => {
  return {
    idVideo: _id?.toString(),
    idUser: idUser?.toString(),
    idRanking: '',
    nameVideo: nameVideo,
    description: description,
    url: url,
    stateVideo: stateVideo,
    dateCreate: dateCreate,
    average: 0,
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
  const data = [];
  for (let index = 0; index < list.length; index++) {
    const obj = { idLike: '', video: {} };
    obj.idLike = list[index]._id;
    obj.video = clearVideoRes(list[index].idVideo);
    data.push(obj);
  }
  return data;
};
