export const clearVideoRes = (infoVideo) => {
  return {
    idVideo: infoVideo._id,
    idUser: infoVideo.idUser,
    nameVideo: infoVideo.nameVideo,
    description: infoVideo.description,
    url: infoVideo.url,
    stateVideo: infoVideo.stateVideo,
    dateCreate: infoVideo.dateCreate,
  };
};

export const clearResVideos = (results) => {
  const data = [];
  for (let index = 0; index < results.length; index++) {
    data.push(clearVideoRes(results[index]));
  }
  return data;
};

export const clearListVideo = (list) => {
  const data = [];
  for (let index = 0; index < list.length; index++) {
    const obj = { idLike: '', video: {} };
    obj.idLike = list[index]._id;
    obj.video = clearVideoRes(list[index].idVideo);
    data.push(obj);
  }
  return data;
};
