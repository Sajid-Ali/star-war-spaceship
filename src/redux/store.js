import { createStore } from "redux";
import { reducers } from "./Reducers/reducers";

const store = createStore(reducers);

export default store;
