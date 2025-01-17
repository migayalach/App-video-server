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
