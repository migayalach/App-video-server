export const totalAverange = (listVotes) => {
  let average = 0;
  for (let i = 0; i < listVotes.length; i++) {
    average += listVotes[i].qualification;
  }
  return Math.round(average / listVotes.length);
};

export const dateSearch = (dateStart, dateEnd) => {
  if (!dateStart) {
  }
  if (!dateEnd) {
  }

  console.log(new Date(dateStart), dateEnd);

  return ':D';
};
