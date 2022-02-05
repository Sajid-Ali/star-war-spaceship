import axios from "axios";
import { put } from "redux-saga/effects";
import { throwServerError } from "../../utilities/utilities";
import starWarAction from "../Reducers/star-war-reducers";

export function* workerFetchList(action) {
  try {
    const response = yield axios.get("starships");
    yield put(starWarAction.fetchSpaceshipSuccess(response.data));
  } catch (error) {
    yield put(starWarAction.fetchSpaceshipFail(error.message));
    throwServerError(error);
  }
}
