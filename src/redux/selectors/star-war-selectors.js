import { createSelector } from "reselect";

const getData = (state) => state.spaceships;

export const getSpaceships = createSelector([getData], (spaceships) => ({
  list: spaceships?.list,
  fleet: spaceships?.fleet,
}));
