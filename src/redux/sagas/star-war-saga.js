import axios from "axios";
import { put } from "redux-saga/effects";
import { throwServerError } from "../../utilities/utilities";
import starWarAction from "../Reducers/star-war-reducers";

export function* workerFetchList(action) {
  try {
    console.log(action, "-=-=-=-=-=-=-");
    const response = yield axios.get(`people/?search=${action.query}`);
    console.log("🚀 ~ file: star-war-saga.js ~ line 10 ~ function*workerFetchList ~ response", response)
    yield put(starWarAction.fetchSpaceshipSuccess(response.data));
  } catch (error) {
    console.log("🚀 ~ file: star-war-saga.js ~ line 12 ~ function*workerFetchList ~ error", error)
    yield put(starWarAction.fetchSpaceshipFail(error.message));
    throwServerError(error);
  }
}
