import { message } from "antd";
import { createReducer, createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  fetchSpaceshipRequest: ["query"],
  fetchSpaceshipSuccess: ["payload"],
  fetchSpaceshipFail: ["error"],

  addToFleetRequest: ["spaceship"],
  deleteFromFleet: ["spaceship"],
});

export const StarWarTypes = Types;
export default Creators;

const initialState = {
  list: {
    loading: false,
    data: null,
    error: false,
  },
  fleet: {
    loading: true,
    data: [],
  },
};

export const fetchListRequest = (state = initialState, action) => {
  return {
    ...state,
    list: { ...state.list, loading: true, data: null, error: false },
  };
};

export const fetchListSuccess = (state = initialState, action) => {
  return {
    ...state,
    list: { ...state.list, loading: false, data: action.payload, error: false },
  };
};

export const fetchListFail = (state = initialState, action) => {
  return {
    ...state,
    list: { ...state.list, data: null, error: action.error, loading: false },
  };
};

export const addToFleet = (state = initialState, { spaceship }) => {
  let result = [];
  const index = state?.fleet?.data?.findIndex(
    (row) => row.key === spaceship?.key
  );
  if (index < 0) {
    result = [...state.fleet.data, spaceship];

    return {
      ...state,
      fleet: { ...state.fleet, data: result },
    };
  } else {
    message.warning("Spaceship already added to your fleet");
    return state;
  }
};
export const deleteFromFleet = (state = initialState, { spaceship }) => {
  let result = state.fleet.data;
  const index = state?.fleet?.data?.findIndex(
    (row) => row.key === spaceship?.key
  );
  if (index > -1) {
    result.splice(index, 1);

    return {
      ...state,
      fleet: { ...state.fleet, data: result },
    };
  } else {
    message.warning("Item not exist in your fleet");
    return state;
  }
};

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.FETCH_SPACESHIP_REQUEST]: fetchListRequest,
  [Types.FETCH_SPACESHIP_SUCCESS]: fetchListSuccess,
  [Types.FETCH_SPACESHIP_FAIL]: fetchListFail,
  [Types.ADD_TO_FLEET_REQUEST]: addToFleet,
  [Types.DELETE_FROM_FLEET]: deleteFromFleet,
};

export const reducer = createReducer(initialState, HANDLERS);
