import { createReducer, createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  fetchSpaceshipRequest: ["query"],
  fetchSpaceshipSuccess: ["payload"],
  fetchSpaceshipFail: ["error"],
});

export const StarWarTypes = Types;
export default Creators;

const initialState = {
  loading: false,
  data: [],
  error: false,
};

export const fetchListRequest = (state = initialState, action) => {
  return { ...state, loading: true, data: [], error: false };
};

export const fetchListSuccess = (state = initialState, action) => {
  return { ...state, loading: false, data: action.payload, error: false };
};

export const fetchListFail = (state = initialState, action) => {
  return { ...state, data: null, error: action.error };
};

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.FETCH_SPACESHIP_REQUEST]: fetchListRequest,
  [Types.FETCH_SPACESHIP_SUCCESS]: fetchListSuccess,
  [Types.FETCH_SPACESHIP_FAIL]: fetchListFail,
};

export const reducer = createReducer(initialState, HANDLERS);
