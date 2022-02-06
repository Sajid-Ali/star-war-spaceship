import { createSelector } from "reselect";

const getData = (state) => state.spaceships;

export const getSpaceships = createSelector([getData], (spaceships) => {
  let list = spaceships.list;
  if (spaceships?.query) {
    const filtered = list?.data?.results?.filter(
      (row) =>
        row?.name?.includes(spaceships?.query) ||
        row?.model?.includes(spaceships?.query)
    );
    list.data.results = filtered;
  }

  return {
    list: list,
    fleet: spaceships?.fleet,
  };
});

export const getSelectedSpaceship = createSelector([getData], (spaceships) => ({
  selected: spaceships?.selected,
}));
