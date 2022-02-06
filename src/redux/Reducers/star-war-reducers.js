import { message } from "antd";
import { createReducer, createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  fetchSpaceshipRequest: ["query"],
  fetchSpaceshipSuccess: ["payload"],
  fetchSpaceshipFail: ["error"],

  addToFleetRequest: ["spaceship"],
  deleteFromFleet: ["spaceship"],
  setSelectedSpaceship: ["spaceship"],

  addPassenger: [],
  removePassenger: [],
  saveToFleet: ["spaceship"],
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
  selected: {
    loading: true,
    data: null,
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
    message.success("Spaceship deleted successfully!");
    return {
      ...state,
      fleet: { ...state.fleet, data: result },
    };
  } else {
    message.warning("Item not exist in your fleet");
    return state;
  }
};

export const setSelectedSpaceship = (state = initialState, { spaceship }) => {
  return {
    ...state,
    selected: { ...state.selected, data: spaceship, loading: false },
  };
};

export const addPassenger = (state = initialState) => {
  const {
    selected: { data },
  } = state;
  const upatedValue = { ...data, count: data?.count + 1 };
  if (upatedValue?.count > data?.passengers) {
    message.warning("You cannot add, spaceship capacity is full!");
    return state;
  }
  return {
    ...state,
    selected: { ...state.selected, data: upatedValue, loading: false },
  };
};

export const saveToFleet = (state = initialState, { spaceship }) => {
  let result = state.fleet.data;
  const index = state?.fleet?.data?.findIndex(
    (row) => row.key === spaceship?.key
  );
  result[index] = spaceship;
  message.success("Updated details successfully!");
  return {
    ...state,
    fleet: { ...state.fleet, data: result },
  };
};

export const removePassenger = (state = initialState) => {
  const {
    selected: { data },
  } = state;
  const upatedValue = { ...data, count: data?.count - 1 };
  if (upatedValue?.count < 0) {
    message.warning("The spaceship don't have any passenger");
    return state;
  }
  return {
    ...state,
    selected: { ...state.selected, data: upatedValue, loading: false },
  };
};

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.FETCH_SPACESHIP_REQUEST]: fetchListRequest,
  [Types.FETCH_SPACESHIP_SUCCESS]: fetchListSuccess,
  [Types.FETCH_SPACESHIP_FAIL]: fetchListFail,
  [Types.ADD_TO_FLEET_REQUEST]: addToFleet,
  [Types.DELETE_FROM_FLEET]: deleteFromFleet,
  [Types.SET_SELECTED_SPACESHIP]: setSelectedSpaceship,
  [Types.ADD_PASSENGER]: addPassenger,
  [Types.REMOVE_PASSENGER]: removePassenger,
  [Types.SAVE_TO_FLEET]: saveToFleet,
};

export const reducer = createReducer(initialState, HANDLERS);
