export const totalAverange = (listVotes) => {
  let average = 0;
  if (!listVotes.length) {
    return average;
  }
  for (let i = 0; i < listVotes.length; i++) {
    average += listVotes[i].qualification;
  }
  return Math.round(average / listVotes.length);
};
