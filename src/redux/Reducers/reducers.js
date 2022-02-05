import { combineReducers } from "redux";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  spaceships: require("./star-war-reducers").reducer,
});
