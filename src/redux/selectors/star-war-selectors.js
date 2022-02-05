import { createSelector } from "reselect";

const getData = (state) => state.spaceships;

export const getSpaceships = createSelector([getData], (data) => {
  // const filterSongs = data.filter((item) => item.kind === "song");
  // const filterSongs = data.filter((item) => item);

  return data;
});
