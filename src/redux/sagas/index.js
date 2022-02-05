import { takeLatest, all } from "redux-saga/effects";
import { StarWarTypes } from "../Reducers/star-war-reducers";

import * as starWarSaga from "./star-war-saga";

function* watchAll() {
  yield all([
    takeLatest(
      StarWarTypes.FETCH_SPACESHIP_REQUEST,
      starWarSaga.workerFetchList
    ),
  ]);
}

export default watchAll;
