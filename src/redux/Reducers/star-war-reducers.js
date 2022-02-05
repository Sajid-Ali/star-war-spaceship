import { createReducer, createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  fetchDataRequest: null,
  fetchDataSuccess: ["payload"],
  fetchDataFail: ["error"],
});

export const StarWarTypes = Types;
export default Creators;

const initialState = {
  loading: false,
  data: [],
  error: false,
};

export const fetchDataRequest = (state = initialState, action) => {
  return { ...state, loading: true, data: [], error: false };
};

export const fetchDataSuccess = (state = initialState, action) => {
  return { ...state, loading: false, data: action.payload, error: false };
};

export const fetchDataFail = (state = initialState, action) => {
  return { ...state, data: null, error: action.error };
};

// map our action types to our reducer functions
export const HANDLERS = {
  [Types.FETCH_DATA_REQUEST]: fetchDataRequest,
  [Types.FETCH_DATA_SUCCESS]: fetchDataSuccess,
  [Types.FETCH_DATA_FAIL]: fetchDataFail,
};

export const reducer = createReducer(initialState, HANDLERS);
